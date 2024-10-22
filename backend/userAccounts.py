from encrypt import Encrypt
from google.cloud.firestore_v1.base_query import FieldFilter

class UserAccounts :
    # create and store user account info in userAccounts document
    def createUserAccount(emailAddress, password, userAccounts_documentRef) :
        # salt and hash password
        encryptedPassword = Encrypt.passwordEncrypt(password)

        # setting userAccount field values
        userAccount = { 'emailAddress' : emailAddress, 'password' : encryptedPassword }

        # storing in userAccounts document in database
        userAccounts_documentRef.set(userAccount)

        # successful user account creation
        return "Welcome to Toebeans!"
    
    # login query using user login input
    def userLoginQuery(emailAddress, password, userAccounts_collectionRef) :
        # find matching emailAddress in collection of userAccount documents and convert to stream
        userAccountMatch = userAccounts_collectionRef.where(filter = FieldFilter("emailAddress", "==", emailAddress)).stream()

        # will only run if userMatch success
        for ACC in userAccountMatch :
           # dictionary instead of snapshot of userAccount document
           userAccountDictionary = ACC.to_dict()
           # access encrypted password
           encryptedPassword = userAccountDictionary["password"]

           # if the login input password and password in userAccount document match
           if Encrypt.passwordCompare(password, encryptedPassword) :
               # updating password field in database with the newly rehashed and resalted password
               userAccounts_collectionRef.document(ACC.id).update({"password" : Encrypt.passwordEncrypt(password)})

               # successful login
               return "You're logged in!"
           
           # if the login input and userAccount passwords don't match
           else :
               # failed login
               return "Password Does Not Match"

        # if no email match, for loop does not run and we return
        return "Email Does Not Exist"