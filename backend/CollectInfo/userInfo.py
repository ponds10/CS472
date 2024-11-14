from Collections.User import User
from CollectInfo import userEntryInfo
from google.cloud.firestore_v1.base_query import FieldFilter

def addUserToDatabase(first_name, last_name, accountID, accountType, email, password, phone, street, state,
                      city, zip, bio, image, userEntry_documentRef, userInfo_documentRef) :
    # error check required fields
    
    # create instance of userEntry in database (hashed password)
    userEntryInfo.createuserEntry(email, password, userEntry_documentRef)

    # creating instance of user in database based on user input
    userInfo = User(first_name, last_name, accountID, accountType, email, phone, street, state, city, zip, bio, image)

    # storing in petEntry document in database
    userInfo_documentRef.set(userInfo.__dict__)

    # return success if required fields completed correctly
    return userInfo_documentRef.get().to_dict()