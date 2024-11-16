from Collections.User import User
from CollectInfo import userEntryInfo
from google.cloud.firestore_v1.base_query import FieldFilter

def addUserToDatabase(accountType, biography, city, email, password, first_name, last_name, phone, state,
                      street, zip, userEntry_collectionRef, userInfo_collectionRef) :
    # error check required fields
    

    # create instance of userEntry in database (hashed password)
    userEntryDoc = userEntryInfo.createuserEntry(email, password, userEntry_collectionRef)

    # creating instance of userInfo in database based on user input
    userInfo = User(accountType, biography, city, email, first_name, last_name, phone, state, street, None, None, zip)

    # storing userInfo document in database
    doc = userInfo_collectionRef.add(userInfo.__dict__)
    doc[1].update({"userID":doc[1].id})

    # connect userEntry and userInfo
    # place userEntryID in userInfo doc
    doc[1].update({"userEntryID":userEntryDoc.id})
    # place userID in userEntryDoc
    userEntryDoc.update({"userID":doc[1].id})

    # return success if required fields completed correctly
    return doc[1].get().to_dict()

def editUserInDatabase(accountType, biography, city, email, first_name, last_name, phone,
                                       state, street, userID, userEntryID, zip, userInfo_documentRef) :
    # error check updated info

    # update existing user in database
    userInfo = User(accountType, biography, city, email, first_name, last_name, phone,
                                       state, street, userID, userEntryID, zip)
    userInfo_documentRef.set(userInfo.__dict__, merge = True)

    # return success if required fields updated correctly
    return userInfo_documentRef.get().to_dict()
    
def deleteUserInDatabase(userInfo_documentRef, userEntry_documentRef) :
    # delete existing user in database
    userInfo_documentRef.delete()

    userEntryInfo.deleteUserEntryInDatabase(userEntry_documentRef)

    # user has been deleted
    return "Success"