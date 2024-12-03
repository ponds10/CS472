import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { collectionData, Firestore, increment, query, Timestamp } from '@angular/fire/firestore';
import { addDoc, collection, orderBy, limit, where, getDocs, startAfter } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Events, EventsAttendance } from '../../models/events';
import { NavigationServiceService } from '../navService/navigation-service.service';
import { concatMap, of, catchError } from 'rxjs';
import { doc, updateDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage:Storage = inject(Storage);
  constructor(private navService: NavigationServiceService) { }

  // manages state for various pages
  selectedEvent: Events | null = null;
  attendedEventsIds: EventsAttendance[] | null = null;
  attendedEvents: Events[] | null = null;

  // upload an image
  async uploadImage(selectedImage: File): Promise<string> {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      console.log("no signed in user");
      return "generic image link";
    }
    // console.log the storage for debug
    //console.log(this.storage)

    // make a storage ref put it in the users bucket in a folder named with the users UID
    // then upload it using the uploadBytes resumable
    const storageref = ref(this.storage, `events/${this.auth.currentUser?.uid}/${selectedImage.name}.png`)
    const fileSnapshot = await uploadBytesResumable(storageref, selectedImage);

    // this gets the url, which we can store in a table
    const publicImageUrl: string = await getDownloadURL(storageref);

    return publicImageUrl;
  }


  async generateEvent(event: Events, selectedImage: File)
  {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      console.log("no signed in user");
      this.navService.navigateToLoginPage();
      return;
    }

    // store into firestore and then get the url
    // console.log to debug
    event.imageURL = await this.uploadImage(selectedImage);
    event.userID = this.auth.currentUser.uid;
    console.log(event.imageURL)

    // simple try/catch to handle errors
    // the prev code should have populated the object, now we can add the doc
    try 
    {
      const newEvent = await addDoc(
        collection(this.firestore, "events"),
        {
          organizer: event.organizer,
          title: event.title,
          summary: event.summary,
      
          imageURL: event.imageURL,
      
          date: Timestamp.fromDate(event.date as Date),
          street: event.street,
          city: event.city,
          state: event.state,
          zip: event.zip,
          country: event.country,
      
          misc: event.misc,
          overview: event.overview,
      
          attendance: 0,
          userID: this.auth.currentUser.uid,
          eventID: crypto.randomUUID(),
        },
      );
      this.navService.navigateToSearchEventPage();
      return newEvent;
    } 
    catch (error) 
    {
      console.error("Error writing new event to Firebase Database", error);
      return;
    }
  }

  getInitalEvents()
  {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      console.log("no signed in user");
      // reroute them to the login page!
      this.navService.navigateToLoginPage();
      return;
    }

    // simple query, gets 12 events
    const eventQuery = query(collection(this.firestore, 'events'), orderBy('date'));

    //const snapshot = await getDocs(eventQuery);
    // const last_entry = snapshot.docs[snapshot.docs.length-1];
    // snapshot.forEach((doc) => {
    //   console.log(doc.data())
    // })

    return collectionData(eventQuery)
  }

  // this will probs be depreciated since i think a paginated query is too extra
  async getNextEvents()
  {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      console.log("no signed in user");
      // reroute them to the login page!
      this.navService.navigateToLoginPage();
      return;
    }

    // this if the last entry is null we need to make a var for it. 
    if(false)
    {
      return this.getInitalEvents();
    }

    // simple query, gets 12 events but uses the startAfter part of the query() params
    // which lets us do a paginated query, to set up pages, should help speed up load times/avoid excessive queries
    const newUserQuery = query(collection(this.firestore, 'events'), startAfter() ,limit(12));

    // await the snapshop / documents
    const snapshot = await getDocs(newUserQuery);

    // need to save this to a local var in the service 
    const last_entry = snapshot.docs[snapshot.docs.length-1];

    return snapshot;

  }

  async attendEvent(event: Events)
  {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      this.navService.navigateToLoginPage();
      return;
    }

    // if the list of attended events is empty then return
    if(this.attendedEvents == null)
    {
      return;
    }

    // check if the eventid is current in the attendedEvents id
    // if it is, then just return and do not add to the count!
    for(const temp of this.attendedEvents!)
    {
      if(event.eventID == temp.eventID )
      {
        console.log("already attending")
        return; 
      }
    }

    // now we need to add to the table that stores our 
    // attendance, using the eventid and user id
    try 
    {
      const newEventAttendance = await addDoc(
        collection(this.firestore, "eventAttendance"),
        {
          userID: this.auth.currentUser!.uid,
          eventID: event.eventID,
        },
      );
    } 
    catch (error) 
    {
      console.error("Error writing event attendance to Firebase Database", error);
      return;
    }

    // Update the Event
    // after the event attendance is tracked, we need to increment the event's attendance
    // for others to see

    try
    {
      // make the query, where we do it based on the eventid
      // then we get the docs, if empty return, otherwise, iterate through 
      // update the document by incrementing the attendance field
      const attendQuery = query(collection(this.firestore, 'events'), where("eventID", "==", event.eventID));
      const snapshot = await getDocs(attendQuery)
      if(snapshot.empty)
      {
        return;
      }
      snapshot.forEach(async (eventDoc) => {
        const docRef = doc(this.firestore, 'events', eventDoc.id);
        await updateDoc(docRef, {
          'attendance': increment(1)
        })
      })
    }
    catch (error)
    {
      // log the error
      console.log("Error, issue with adding you to the attendance")
    }

    // do it locally in the event we do not requery
    event.attendance += 1;
  }

  getAttendedEvents()
  {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      this.navService.navigateToLoginPage();
        return;
    }

    try {
      const eventAttendanceQuery = query(collection(this.firestore, 'eventAttendance'), where("userID", "==", this.auth.currentUser?.uid));
      
      
      return collectionData(eventAttendanceQuery).pipe(
        concatMap((eventIds: EventsAttendance[]) => {
          const chunk_ids = eventIds.map(eventAttendance => eventAttendance.eventID);
          const eventAttendanceQuery2 = query(collection(this.firestore, 'events'), where("eventID", "in", chunk_ids));
          return collectionData(eventAttendanceQuery2);
        }),
        catchError((error) => {
          console.error('Error retrieving event data', error);
          return of([]);  // Return empty array in case of error
        })
      );
    } 
    catch (error) {
      console.error('Unexpected error', error);
      return of([]);  // Return empty array in case of error
    }
  }

  // checks if the event is already attended
  // returns true if it is found through iterating
  // returns false if the list is empty or its not found in the list! 
  checkAttendance(event: Events)
  {
    if(this.attendedEvents == null)
    {
      return false;
    }
    for(const currEvent of this.attendedEvents!)
    {
      if(event.eventID == currEvent.eventID)
      {
        return true;
      }
    }
    return false;
  }

  getOrganizer(orgId: string)
  {
    try {
      const orgQuery = query(collection(this.firestore, 'userInfo'), where("userID", "==", orgId));
      // await the snapshop / documents
      return collectionData(orgQuery)
    } 
    catch (error) {
      console.error('Unexpected error', error);
      return of(error);
    }
  }

  getSelectedEvent(eventID: string)
  {
    // simple query, gets 12 events
    const eventQuery = query(collection(this.firestore, 'events'), where('eventID','==', eventID));

    return collectionData(eventQuery)
  }
}
