import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from fastapi import FastAPI, Form
import ssl

#connect to database
#to get credential, go to Project Settings/Service Accounts in project and generate private key
#put path of the private key in variable below
cred = credentials.Certificate (r"toebeans-d6f03-firebase-adminsdk-rrbfg-76d64f3471.json")
firebase_admin.initialize_app(cred)

#to communicate with database
db = firestore.client()

app = FastAPI()
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain('cert.pem', keyfile = 'key.pem')

#data to store in database
#userAccount = {
#    'emailAddress' : 'mesarodr@unlv.nevada.edu',    #'key' : 'value'
#    'password' : 'password'
#}

#reference to collection of docs userAccounts
doc_ref = db.collection('userAccounts').document()

#doc_ref.set(userAccount)
#storing in database
@app.get("/") #"/" is the landing page for now
def getting(emailAddress:str=Form(...), password:str=Form(...)):
    userAccount = { 'emailAddress' : emailAddress, 'password' : password }
    doc_ref.set(userAccount)
    return "success"
    