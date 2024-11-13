import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage:Storage = inject(Storage)

  imageUrl: string | null = null;
  constructor() { }

  // upload images
  // takes in a file
  // returns nothing
  async uploadImage(selectedImage: File) {
    // if the current user is null then return
    if (this.auth.currentUser === null) {
      console.log("no signed in user");
      return;
    }
    // console.log the storage for debug
    //console.log(this.storage)

    // make a storage ref put it in the users bucket in a folder named with the users UID
    // then upload it using the uploadBytes resumable
    const storageref = ref(this.storage, `pets/${this.auth.currentUser?.uid}/${selectedImage.name}.png`)
    const fileSnapshot = await uploadBytesResumable(storageref, selectedImage);

    // this gets the url, which we can store in a table
    const publicImageUrl = await getDownloadURL(storageref);
    this.imageUrl = publicImageUrl;
    return;
  }

  // generate the account!
  // takes in userInfo of the userModel
  // returns nothing, VOID
  async generatePetPost(userInfo: any, selectedImage: File)
  {
    // if the user info is null, return 
    if(userInfo == null)
    {
      console.log("Userinfo empty");
      return;
    }
    
    // if there is no logged in user, return
    if(this.auth.currentUser == null)
    {
      console.log("No user currently signed in!");
    }

    // otherwise, try to add a new document to the userInfo collection and return it
    // if it errors catch it and then print it for debug
    try 
    {
      await this.uploadImage(selectedImage);

      
    } 
    catch (error) 
    {
      console.error("Error writing new message to Firebase Database", error);
    }

    return;
  }
}