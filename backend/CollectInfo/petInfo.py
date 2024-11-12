from Collections.Pet import Pet
from google.cloud.firestore_v1.base_query import FieldFilter

def addPetToDatabase(id, name, species, breed, sex, age, weight, image, documents, contact, petInfo_documentRef) :
    # error check required fields
    
    # creating instance of pet in database based on user input
    petInfo = Pet(id, name, species, breed, sex, age, weight, image, documents, contact)

    # storing in petEntry document in database
    petInfo_documentRef.set(petInfo.__dict__)

    # return success if required fields completed correctly
    return "Pet successfully posted"