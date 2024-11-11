import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { User } from '../../models/user';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage:Storage = inject(Storage)

  constructor() { }

  // sample service that should get the user information based on authentification from the firebase db
  sampleUser: User = {
    first_name: 'Andrew',
    last_name: 'Hipp',
    userID: '11223344556677',
    accountType: 'individual',
    email: 'sample@email.com',
    phone: '702-123-4567',
    street: '123 LV BLVD',
    state: 'Nevada',
    city: 'Las Vegas',
    zip: '89103',
    biography: 'Hello! I am a passionate animal lover who often fosters dogs and cats.',
  }

  // returns the user!
  get_sample_user()
  {
    return this.sampleUser;
  }

  async uploadImage(selectedImage: File) {
    if (this.auth.currentUser === null) {
      console.log("no signed in user");
      return;
    }
    // 2 - Upload the image to Cloud Storage.
    console.log(this.storage)
    const storageref = ref(this.storage, `users/${this.auth.currentUser?.uid}/${selectedImage.name}.png`)
    const fileSnapshot = await uploadBytesResumable(storageref, selectedImage);

    const publicImageUrl = await getDownloadURL(storageref);

    const entry = 
    {
      profile_img_url: publicImageUrl,
      accountID: this.auth.currentUser.uid
    }

    try {
      const newImage = await addDoc(
        collection(this.firestore, "profileImages"),
        entry,
      );
      return newImage;
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
      return;
    }
  }

  async generateAccount(userInfo: User)
  {
    if(userInfo == null)
    {
      console.log("Userinfo empty");
      return;
    }else if(this.auth.currentUser == null)
    {
      console.log("No user currently signed in!");
    }

    try {
      const newUser = await addDoc(
        collection(this.firestore, "userInfo"),
        userInfo,
      );
      return newUser;
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
      return;
    }
  }
}
