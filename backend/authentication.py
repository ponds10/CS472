#Wrapper library.
import pyrebase

#Firebase Libraries
import firebase_admin

#Email Verification Link Library
import smtplib

#Initialize app instance.
"""
Note: Since we are using firestore and not realtime database, we do not need a key-value pair for
the key 'databaseURL'
"""
firebaseConfig = {
  'apiKey': "AIzaSyADxlQyq1u7g4LULCI9RfhKdheVkAOscoI",
  'authDomain': "toebeans-d6f03.firebaseapp.com",
  'projectId': "toebeans-d6f03",
  'storageBucket': "toebeans-d6f03.appspot.com",
  'messagingSenderId': "10600296290",
  'appId': "1:10600296290:web:ccff98c6130c4bb517c63b",
  'measurementId': "G-J0JRTK8PVE",
}

firebase = pyrebase.initialize_app(firebaseConfig)

#Create reference to firebase's authentication services
auth = firebase.auth()



