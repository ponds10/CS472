import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDoc, doc } from '@angular/fire/firestore';
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

  animalTypes: string[] = [
    'Cat',
    'Dog',
  ]

  catBreeds: string[] = [
    'Calico'
  ]

  dogBreeds: string[] = [
    'bulldog',
    'pitbull',
  ]

  animalGenders: string[] = [
    'Male',
    'Female'
  ]

  ages: string[] = [
    '0-1',
    '2-6',
    '7-9',
    '10+'
  ]

  animalSizes: string[] = [
    'Small',
    'Medium',
    'Large'
  ]

  animalPrograms: string[] = [
    'Shelter',
    'Foster'
  ]
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
  };

  //get all the pets
  loadPets = () => {
    const pets = query(collection(this.firestore, 'petInfo'),
    orderBy('name'));
    return collectionData(pets);
  };

  // get the pet by the id
  getPetById = async (id: string) => {
    const petRef = doc(this.firestore, 'petInfo', id); // Use doc() for a single document
  const petData = await getDoc(petRef); // Use getDoc() for a single document

  if (petData.exists()) {
    return petData.data(); // Return the data if the document exists
  } else {
    return null; // Or throw an error if the document doesn't exist
  }
  };
}
