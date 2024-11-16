import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { collectionData, Firestore, Timestamp } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDocs, startAfter } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Events } from '../../models/events';
import { NavigationServiceService } from '../navService/navigation-service.service';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage:Storage = inject(Storage)
  constructor(private navService: NavigationServiceService) { }

  
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
      
          date: Timestamp.fromDate(event.date),
          street: event.street,
          city: event.city,
          state: event.state,
          zip: event.zip,
          country: event.country,
      
          misc: event.misc,
      
          attendance: 0,
          userID: this.auth.currentUser.uid,
          eventID: crypto.randomUUID(),
        },
      );

      return newEvent;
    } 
    catch (error) 
    {
      console.error("Error writing new event to Firebase Database", error);
      return;
    }
  }

  async getInitalEvents()
  {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      console.log("no signed in user");
      // reroute them to the login page!
      this.navService.navigateToLoginPage();
      return;
    }

    // simple query, gets 12 events
    const newUserQuery = query(collection(this.firestore, 'events'), limit(12));

    // await the snapshop / documents
    const snapshot = await getDocs(newUserQuery);

    // need to save this to a local var in the service 
    const last_entry = snapshot.docs[snapshot.docs.length-1];

    return snapshot;
  }

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
}
