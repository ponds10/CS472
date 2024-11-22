# Deploy with `firebase deploy`
from CollectInfo import userEntryInfo, userInfo, petInfo, eventInfo
from firebase_functions import https_fn
from firebase_admin import initialize_app, firestore, credentials
import google.cloud.firestore
from datetime import datetime

# replace "..." with private key path
cred = credentials.Certificate (r"")

initialize_app(cred)

# communicate with database
db = firestore.client()

#-----------------------------------------------------------USER ACCOUNTS---------------------------------------------------------------------
@https_fn.on_request()
def addUser(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    userEntry_collectionRef = db.collection("userEntry")
    userInfo_collectionRef = db.collection("userInfo")

    accountType = req.args.get("accountType")
    biography = req.args.get("biography")
    city = req.args.get("city")
    email = req.args.get("email")
    password = req.args.get("password")
    first_name = req.args.get("first_name")
    last_name = req.args.get("last_name")
    phone = req.args.get("phone")
    state = req.args.get("state")
    street = req.args.get("street")
    zip = req.args.get("zip")

    userInfo.addUserToDatabase(
        accountType, 
        biography,
        city,
        email,
        password,
        first_name,
        last_name,
        phone,
        state,
        street,
        zip,
        userEntry_collectionRef,
        userInfo_collectionRef
    )

    return https_fn.Response("Successful")

@https_fn.on_request()
def loginUser(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    userEntry_collectionRef = db.collection("userEntry")
    userInfo_collectionRef = db.collection("userInfo")

    email = req.args.get("email")
    password = req.args.get("password")

    result = userEntryInfo.userLoginQuery(email, password, userEntry_collectionRef, userInfo_collectionRef)

    if result is None:
        return https_fn.Response("Login Failed")

    return https_fn.Response(result)

@https_fn.on_request()
def editUser(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    userInfo_collectionRef = db.collection("userInfo")

    accountType = req.args.get("accountType")
    biography = req.args.get("biography")
    city = req.args.get("city")
    email = req.args.get("email")
    first_name = req.args.get("first_name")
    last_name = req.args.get("last_name")
    phone = req.args.get("phone")
    state = req.args.get("state")
    street = req.args.get("street")
    userID = req.args.get("userID")
    userEntryID = req.args.get("userEntryID")
    zips = req.args.get("zip")

    userInfo.editUserInDatabase(accountType, biography, city, email, first_name, last_name, phone,
                                        state, street, userID, userEntryID, zips, userInfo_collectionRef.document(userID))
    return https_fn.Response("Successful")

@https_fn.on_request()
def deleteUser(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    userEntry_collectionRef = db.collection("userEntry")
    userInfo_collectionRef = db.collection("userInfo")

    userID = req.args.get("userID")
    userEntryID = req.args.get("userEntryID")

    userInfo.deleteUserInDatabase(userInfo_collectionRef.document(userID), userEntry_collectionRef.document(userEntryID))
    return https_fn.Response("Successful")

#-----------------------------------------------------------PETS---------------------------------------------------------------------
@https_fn.on_request()
def addPet(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    petInfo_collectionRef = db.collection('petInfo')

    name = req.args.get("name")
    species = req.args.get("species")
    breed = req.args.get("breed")
    sex = req.args.get("sex")
    age = req.args.get("age")
    weight = req.args.get("weight")
    image = req.args.get("image")
    documents = req.args.get("documents")
    contact = req.args.get("contact")

    petInfo.addPetToDatabase(name, species, breed, sex, age, weight, image, documents, contact, petInfo_collectionRef)

    return https_fn.Response("Successful")

@https_fn.on_request()
def editPet(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    petInfo_collectionRef = db.collection('petInfo')

    petID = req.args.get("petID")
    name = req.args.get("name")
    species = req.args.get("species")
    breed = req.args.get("breed")
    sex = req.args.get("sex")
    age = req.args.get("age")
    weight = req.args.get("weight")
    image = req.args.get("image")
    documents = req.args.get("documents")
    contact = req.args.get("contact")

    petInfo.editPetInDatabase(petID, name, species, breed, sex, age, weight, image, documents, contact,
                                    petInfo_collectionRef.document(petID))
    
    return https_fn.Response("Successful")

@https_fn.on_request()
def deletePet(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    petInfo_collectionRef = db.collection('petInfo')

    petID = req.args.get("petID")
    petInfo.deletePetInDatabase(petInfo_collectionRef.document(petID))

    return https_fn.Response("Successful")

#-----------------------------------------------------------EVENTS---------------------------------------------------------------------
@https_fn.on_request()
def addEvent(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    eventInfo_collectionRef = db.collection('eventInfo')

    attendance = req.args.get("attendance")
    date = req.args.get("date")
    description = req.args.get("description")
    imageURL = req.args.get("imageURL")
    title = req.args.get("title")
    userID = req.args.get("userID")

    eventInfo.addEventToDatabase(attendance, date, description, imageURL, title, userID, eventInfo_collectionRef)

    return https_fn.Response("Successful")

@https_fn.on_request()
def editEvent(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    eventInfo_collectionRef = db.collection('eventInfo')
    
    eventID = req.args.get("eventID")
    attendance = req.args.get("attendance")
    date = req.args.get("date")
    description = req.args.get("description")
    imageURL = req.args.get("imageURL")
    title = req.args.get("title")
    userID = req.args.get("userID")

    eventInfo.editEventInDatabase(eventID, attendance, date, description, imageURL, title, userID,
                                         eventInfo_collectionRef.document(eventID))    
    return https_fn.Response("Successful")

@https_fn.on_request()
def deleteEvent(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    eventInfo_collectionRef = db.collection('eventInfo')

    eventID = req.args.get("eventID")
    eventInfo.deleteEventInDatabase(eventInfo_collectionRef.document(eventID))

    return https_fn.Response("Successful")
