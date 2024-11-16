from CollectInfo import userEntryInfo, userInfo, petInfo, eventInfo
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from fastapi import FastAPI, Form
import ssl
import uvicorn
from datetime import datetime

# ----------------------------------------connect to database----------------------------------------

# replace "..." with your private key path
cred = credentials.Certificate (r"perms\toebeans-d6f03-firebase-adminsdk-rrbfg-bfd5ef429b.json")

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

# create reference to collection of docs eventInfo
eventInfo_collectionRef = db.collection('eventInfo')

# ----------------------------------------storing in database----------------------------------------

# FastAPI gets URL, then calls def function
# get user input for account
@app.get("/create-account")
def getUserInfo(accountType:str=Form(...), biography:str=Form(...), city:str=Form(...), email:str=Form(...),
                password:str=Form(...), first_name:str=Form(...), last_name:str=Form(...), phone:str=Form(...),
                state:str=Form(...), street:str=Form(...), zip:str=Form(...)) :
    # create and store user account info in userEntry document
    return userInfo.addUserToDatabase(accountType, biography, city, email, password, first_name, last_name, phone,
                                      state, street, zip, userEntry_collectionRef,
                                      userInfo_collectionRef)

# get user input for login
@app.get("/user-login")
def userLoginInfo(email:str=Form(...), password:str=Form(...)) :
    # login query using user login input
    return userEntryInfo.userLoginQuery(email, password, userEntry_collectionRef, userInfo_collectionRef)

# match existing user in database and edit fields
@app.get("/edit-user")
def editUserInfo(accountType:str=Form(...), biography:str=Form(...), city:str=Form(...), email:str=Form(...),
                 first_name:str=Form(...), last_name:str=Form(...), phone:str=Form(...), state:str=Form(...),
                 street:str=Form(...), userID:str=Form(...), userEntryID:str=Form(...), zip:str=Form(...)) :
    # update userInfo document
    return userInfo.editUserInDatabase(accountType, biography, city, email, first_name, last_name, phone,
                                       state, street, userID, userEntryID, zip, userInfo_collectionRef.document(userID))

# match existing user in database and delete
@app.get("/delete-user")
def deleteUser(userID:str=Form(...), userEntryID:str=Form(...)) :
    # delete userInfo and userEntry documents
    return userInfo.deleteUserInDatabase(userInfo_collectionRef.document(userID), userEntry_collectionRef.document(userEntryID))

# get user input for new pet
@app.get("/add-pet")
def getPetInfo(name:str=Form(...), species:str=Form(...), breed:str=Form(...),
                     sex:str=Form(...), age:int=Form(...), weight:int=Form(...), image:str=Form(...),
                     documents:str=Form(...), contact:str=Form(...)) :
    # create and store petInfo document
    return petInfo.addPetToDatabase(name, species, breed, sex, age, weight, image, documents, contact,
                                    petInfo_collectionRef)

# match existing pet in database and edit fields
@app.get("/edit-pet")
def editPetInfo(petID:str=Form(...), name:str=Form(...), species:str=Form(...), breed:str=Form(...),
                     sex:str=Form(...), age:int=Form(...), weight:int=Form(...), image:str=Form(...),
                     documents:str=Form(...), contact:str=Form(...)) :
    # update petInfo document
    return petInfo.editPetInDatabase(petID, name, species, breed, sex, age, weight, image, documents, contact,
                                    petInfo_collectionRef.document(petID))

# match existing pet in database and delete
@app.get("/delete-pet")
def deletePetInfo(petID:str=Form(...)) :
    # delete petInfo document
    return petInfo.deletePetInDatabase(petInfo_collectionRef.document(petID))

# get org user input for new event
@app.get("/add-event")
def getEventInfo(attendance:int=Form(...), date:datetime=Form(...), description:str=Form(...), imageURL:str=Form(...),
                 title:str=Form(...), userID:str=Form(...)) :
    # create and store eventInfo document
    return eventInfo.addEventToDatabase(attendance, date, description, imageURL, title, userID, eventInfo_collectionRef)

# match existing event in database and edit fields
@app.get("/edit-event")
def editEventInfo(attendance:int=Form(...), date:datetime=Form(...), description:str=Form(...), eventID:int=Form(...),
                  imageURL:str=Form(...), title:str=Form(...), userID:str=Form(...)) :
    # update eventInfo document
    return eventInfo.editEventInDatabase(attendance, date, description, eventID, imageURL, title, userID,
                                         eventInfo_collectionRef.document(eventID))

# match existing event in database and delete
@app.get("/delete-event")
def deleteEventInfo(eventID:str=Form(...)) :
    # delete eventInfo document
    return eventInfo.deleteEventInDatabase(eventInfo_collectionRef.document(eventID))

# ----------------------------------------command runs API----------------------------------------

# for local testing
if __name__ == '__main__' :
    uvicorn.run(app, host = '127.0.0.1', port = 8000, ssl_certfile = r"perms\cert.pem", ssl_keyfile = r"perms\key.pem")