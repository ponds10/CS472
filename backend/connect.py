from CollectInfo import userEntryInfo, userInfo, petInfo
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from fastapi import FastAPI, Form
import ssl
import uvicorn

# ----------------------------------------connect to database----------------------------------------

# replace "..." with your private key path
cred = credentials.Certificate (r"perms\toebeans-d6f03-firebase-adminsdk-rrbfg-983a4fcf8a.json")

firebase_admin.initialize_app(cred)                                                        

# communicate with database
db = firestore.client()

# certification
app = FastAPI()
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(r'perms\cert.pem', keyfile = r'perms\key.pem')

# create reference to collection of docs userEntry
userEntry_collectionRef = db.collection('userEntry')

# create reference to collection of docs userInfo
userInfo_collectionRef = db.collection('userInfo')

# create reference to collection of docs petEntry
petInfo_collectionRef = db.collection('petInfo')

# ----------------------------------------storing in database----------------------------------------

# FastAPI gets URL, then calls def function
# get user input for account
@app.get("/create-account")
def getUserInfo(first_name:str=Form(...), last_name:str=Form(...), accountID:str=Form(...),
                accountType:str=Form(...), email:str=Form(...), password:str=Form(...),
                phone:str=Form(...), street:str=Form(...), state:str=Form(...), city:str=Form(...),
                zip:str=Form(...), bio:str=Form(...), image:str=Form(...)) :
    # create and store user account info in userEntry document
    return userInfo.addUserToDatabase(first_name, last_name, accountID, accountType, email,
                                      password, phone, street, state, city, zip, bio, image,
                                      userEntry_collectionRef.document(), userInfo_collectionRef.document())
    # ^ returns success or fail

# get user input for login
@app.get("/user-login")
def userLoginInfo(emailAddress:str=Form(...), password:str=Form(...)) :
    # login query using user login input
    return userEntryInfo.userLoginQuery(emailAddress, password, userEntry_collectionRef)
    # ^ returns success or fail

# get user input for new pet
@app.get("/add-pet")
def getPetInfo(id:str=Form(...), name:str=Form(...), species:str=Form(...), breed:str=Form(...),
                     sex:str=Form(...), age:str=Form(...), weight:str=Form(...), image:str=Form(...),
                     documents:str=Form(...), contact:str=Form(...)) :
    # create and store pet info in petInfo document
    return petInfo.addPetToDatabase(id, name, species, breed, sex, age, weight, image, documents, contact,
                                    petInfo_collectionRef.document())
    # ^ returns success or fail

# ----------------------------------------command runs API----------------------------------------

# for local testing
if __name__ == '__main__' :
    uvicorn.run(app, host = '127.0.0.1', port = 8000, ssl_certfile = r"perms\cert.pem", ssl_keyfile = r"perms\key.pem")