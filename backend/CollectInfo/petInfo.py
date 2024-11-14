from Collections.Pet import Pet
from google.cloud.firestore_v1.base_query import FieldFilter

def addPetToDatabase(name, species, breed, sex, age, weight, image, documents, contact, petInfo_collectionRef) :
    # error check required fields
    
    # creating instance of pet in database based on user input
    petInfo = Pet(None, name, species, breed, sex, age, weight, image, documents, contact)

    # storing in petEntry document in database
    doc = petInfo_collectionRef.add(petInfo.__dict__)
    doc[1].update({"id":doc[1].id})

    # return success if required fields completed correctly
    return doc[1].get().to_dict()

def editPetInDatabase(id, name, species, breed, sex, age, weight, image, documents, contact, petInfo_documentRef) :
    # error check updated info

    # update existing pet in database
    petInfo = Pet(id, name, species, breed, sex, age, weight, image, documents, contact)
    petInfo_documentRef.set(petInfo.__dict__, merge = True)

    # return success if required fields updated correctly
    return petInfo_documentRef.get().to_dict()

def deletePetInDatabase(petInfo_documentRef) :
    # delete existing pet in database
    petInfo_documentRef.delete()

    # pet has been deleted
    return "Success"