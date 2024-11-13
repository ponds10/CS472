import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Events } from '../../models/events';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage:Storage = inject(Storage)
  constructor() { }

  
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
      return;
    }

    // making sure request object does not have any empty fields
    if
    (
      event.attendance === null || 
      event.date === null ||
      event.description === null ||
      event.title === null
    )
    {
      console.log("Event object is missing required values")
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
        event,
      );

      return newEvent;
    } 
    catch (error) 
    {
      console.error("Error writing new event to Firebase Database", error);
      return;
    }
  }
}
