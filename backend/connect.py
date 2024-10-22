import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from fastapi import FastAPI, Form
import ssl
import uvicorn

from userAccounts import UserAccounts

# ----------------------------------------connect to database----------------------------------------

# path of private key
cred = credentials.Certificate (r"perms\toebeans-d6f03-firebase-adminsdk-rrbfg-0bfa7474df.json")
firebase_admin.initialize_app(cred)                                                        

# communicate with database
db = firestore.client()

# certification
app = FastAPI()
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(r'perms\cert.pem', keyfile = r'perms\key.pem')

# create reference to collection of docs userAccounts
userAccounts_collectionRef = db.collection('userAccounts')

# ----------------------------------------storing in database----------------------------------------

# FastAPI gets URL, then calls def function
@app.get("/create-account") 
def getuserAccountInput(emailAddress:str=Form(...), password:str=Form(...)) :
    # store user account info in userAccounts document
    return UserAccounts.storeUserAccount(emailAddress, password, userAccounts_collectionRef.document())
    # ^ returns success or fail

@app.get("/user-login")
def userLoginInfo(emailAddress:str=Form(...), password:str=Form(...)) :
    # login query using user login input
    return UserAccounts.userLoginQuery(emailAddress, password, userAccounts_collectionRef)
    # returns success or fail

@app.get("/")
def test() :
    return "Hello World"
# ----------------------------------------command runs API----------------------------------------

# for local testing
if __name__ == '__main__' :
    uvicorn.run(app, host = '127.0.0.1', port = 8000, ssl_certfile = r"perms\cert.pem", ssl_keyfile = r"perms\key.pem")
