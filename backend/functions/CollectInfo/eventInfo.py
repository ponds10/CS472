from Collections.Event import Event
from google.cloud.firestore_v1.base_query import FieldFilter
from datetime import datetime

def addEventToDatabase(attendance, date, description, imageURL, title, userID, eventInfo_collectionRef) :
    # error check required fields
    

    # convert string date to timestamp 
    #date = datetime.strptime(date, "%m/%d/%y %H:%M:%S")
    
    # creating instance of event in database based on org user input
    eventInfo = Event(None, attendance, date, description, imageURL, title, userID)

    # storing in eventInfo document in database
    doc = eventInfo_collectionRef.add(eventInfo.__dict__)
    doc[1].update({"eventID":doc[1].id})

    # return success if required fields completed correctly
    return doc[1].get().to_dict()

def editEventInDatabase(eventID, attendance, date, description, imageURL, title, userID, eventInfo_documentRef) :
    # error check updated info

    # update existing event in database
    eventInfo = Event(eventID, attendance, date, description, imageURL, title, userID)
    eventInfo_documentRef.set(eventInfo.__dict__, merge = True)

    # return success if required fields updated correctly
    return eventInfo_documentRef.get().to_dict()

def deleteEventInDatabase(eventInfo_documentRef) :
    # delete existing event in database
    eventInfo_documentRef.delete()

    # event has been deleted
    return "Success"