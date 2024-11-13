import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { profileImages, User } from '../../models/user';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage:Storage = inject(Storage)
  currentUser: User | null = null;
  currentImage: profileImages | null = null;
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

  // real code!

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
    const storageref = ref(this.storage, `users/${this.auth.currentUser?.uid}/${selectedImage.name}.png`)
    const fileSnapshot = await uploadBytesResumable(storageref, selectedImage);

    // this gets the url, which we can store in a table
    const publicImageUrl = await getDownloadURL(storageref);

    // make the entry for the db
    const entry = 
    {
      profile_img_url: publicImageUrl,
      accountID: this.auth.currentUser.uid
    }

    // try to await adding the document to the profile images 
    // if it errors catch and log it, otherwise return
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

  // generate the account!
  // takes in userInfo of the userModel
  // returns nothing, VOID
  async generateAccount(userInfo: User, selectedImage: File)
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
    try {
      this.uploadImage(selectedImage);

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

  // getuserInfo
  // attempts to get the current users profile info, only called when the user enters the settings tab
  // no args, and is meant to return the current user
  async getUserInfo()
  {
    // if the current user is not null! return, no need to invoke a call to firebase and incurr charges
    if(this.currentUser != null)
    {
      return;
    }

    // if there is no current user, then also return and log
    if (this.auth.currentUser == null ) {
      console.log("not logged in, no current user, redirecting to login page");
      return;
    }

    // simple query, that gets the 1st user where the field of userID = the current logged in user's ID
    const newUserQuery = query(collection(this.firestore, 'userInfo'), where("userID", "==", this.auth.currentUser?.uid), limit(1));

    // await the snapshop / documents
    const snapshot = await getDocs(newUserQuery);
    
    // iterate through (should rlly just be one though) log it and then update current user inside
    snapshot.forEach((doc) => 
    {
      console.log(doc.get('first_name'));
      // let temp: User = doc.data() as User;
      // console.log(temp)
      // console.log(doc.data())
      this.currentUser = doc.data() as User;
    })
    return this.currentUser;
  }

   // getuserInfo
  // attempts to get the current users profile info, only called when the user enters the settings tab
  // no args, and is meant to return the current user
  async getProfileImage()
  {
    // if the current user is not null! return, no need to invoke a call to firebase and incurr charges
    if(this.currentUser != null)
    {
      return;
    }

    // if there is no current user, then also return and log
    if (this.auth.currentUser == null ) {
      console.log("not logged in, no current user, redirecting to login page");
      return;
    }

    // simple query, that gets the 1st user where the field of userID = the current logged in user's ID
    const newUserQuery = query(collection(this.firestore, 'profileImages'), where("accountID", "==", this.auth.currentUser?.uid), limit(1));

    // await the snapshop / documents
    const snapshot = await getDocs(newUserQuery);
    
    // iterate through (should rlly just be one though) log it and then update current user inside
    snapshot.forEach((doc) => 
    {
      // let temp: User = doc.data() as User;
      // console.log(temp)
      // console.log(doc.data())
      this.currentImage = doc.data() as profileImages;
    })
    return this.currentImage;
  }
}
