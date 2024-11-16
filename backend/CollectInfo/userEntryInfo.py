from Collections.UserEntry import UserEntry
from Utilities import hash
from google.cloud.firestore_v1.base_query import FieldFilter
'''
import smtplib
import os
'''

# create and store user entry info in userEntry document
def createuserEntry(email, password, userEntry_collectionRef) :
    '''
    # generate email verification link
    link = auth.generate_password_reset_link(emailAddress)
    
    # SMTP Needed Information
    server = "smtp.gmail.com" 
    port = 587
    sender_email = "toebeans962@gmail.com"
    receiver_email = emailAddress
    password = os.environ.get(smtp_password)

    # email message content
    message = f"""Subject: Toebeans Email Verification
    Welcome user,
    
    Please verify your email with the below link.
    {link}

    From,
    Toebeans"""

    # create a smtp object
    smtp = smtplib.SMTP(server, port)

    # connect to smtp server
    smtp.starttls()

    # login to sender email
    smtp.login(sender_email, password)

    # send verification email to user
    smtp.sendmail(sender_email, receiver_email, message)

    # disconnect from smtp server
    smtp.quit()
    '''

    # salt and hash password
    hashedPassword = hash.passwordHash(password)

    # setting userEntry field values
    userEntryInfo = UserEntry(None, email, hashedPassword)

    # storing userEntry document in database
    # .add returns what we just added to database
    doc = userEntry_collectionRef.add(userEntryInfo.__dict__)

    # return userEntry doc reference
    return doc[1]

# login query using user login input
def userLoginQuery(email, password, userEntry_collectionRef, userInfo_collectionRef) :
    # find matching email address in collection of userEntry documents and convert to stream
    userEntryMatch = userEntry_collectionRef.where(filter = FieldFilter("email", "==", email)).stream()

    # will only run if userMatch success
    for ACC in userEntryMatch :
        # dictionary instead of snapshot of userEntry document
        userEntryDictionary = ACC.to_dict()
        # access hashed password
        hashedPassword = userEntryDictionary["password"]

        # if the login input password and password in userEntry document match
        if hash.passwordCompare(password, hashedPassword) :
            # updating password field in database with the newly rehashed and resalted password
            userEntry_collectionRef.document(ACC.id).update({"password" : hash.passwordHash(password)})

            # get userInfo if login is valid
            doc = userInfo_collectionRef.document(userEntryDictionary["userID"])
            
            # successful login
            return doc.get().to_dict()
        
        # if the login input and userEntry passwords don't match
        else :
            # failed login
            return "Password Does Not Match"

    # if no email match, for loop does not run and we return
    return "Email Does Not Exist"

'''
def editUserEntryInDatabase(userID, accountType, biography, city, email, password, first_name, last_name, phone,
                                       state, street, zip, userEntry_documentRef) :
    # error check updated info

    # update existing user in database
    userEntryInfo = UserEntry(userID, accountType, biography, city, email, password, first_name, last_name, phone,
                                       state, street, zip)
    userEntry_documentRef.set(userEntryInfo.__dict__, merge = True)

    # return success if required fields updated correctly
    return userEntry_documentRef.get().to_dict()
'''

def deleteUserEntryInDatabase(userEntry_documentRef) :
    # delete existing user in database
    userEntry_documentRef.delete()

    # user has been deleted
    return "Success"