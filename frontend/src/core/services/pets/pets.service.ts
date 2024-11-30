import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Pet, ContactInfo } from '../../models/pet.model';
import { NavigationServiceService } from '../navService/navigation-service.service';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage:Storage = inject(Storage)
  navService = inject(NavigationServiceService)

  imageUrl: string = '';
  constructor() { }

  animalTypes: string[] = [
    'Cat',
    'Dog',
  ]

  catBreeds: string[] = [
    'Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'Sphynx', 'Bengal', 'British Shorthair', 'Scottish Fold', 
    'Abyssinian', 'Birman', 'Russian Blue', 'Savannah', 'Norwegian Forest', 'Oriental', 'American Shorthair', 
    'Devon Rex', 'Cornish Rex', 'Himalayan', 'Turkish Van', 'Burmese', 'Tonkinese', 'Exotic Shorthair', 'Balinese', 
    'Egyptian Mau', 'Ocicat'
  ]

  dogBreeds: string[] = [
    'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Poodle', 'Beagle', 
    'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Dachshund', 'Shih Tzu', 'Siberian Husky', 'Doberman Pinscher', 
    'Great Dane', 'Chihuahua', 'Australian Shepherd', 'Cocker Spaniel', 'Pomeranian', 'Border Collie', 'Shiba Inu', 
    'Bichon Frise', 'Maltese', 'Pit Bull Terrier', 'Jack Russell Terrier', 'Cavalier King Charles Spaniel'
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
    'Foster',
    'Personal'
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

  async generatePet(pet: Pet, selectedImage: File)
  {
    // if the current user is null then return
    if (this.auth.currentUser === null || this.auth.currentUser === undefined) {
      console.log("no signed in user");
      this.navService.navigateToLoginPage();
      return;
    }

    // store into firestore and then get the url
    // console.log to debug
    await this.uploadImage(selectedImage);
    pet.image = this.imageUrl
    pet.uid = this.auth.currentUser.uid;
    console.log(pet.image)

    let contact = {
      organization: { name: this.auth.currentUser.displayName },
      email: this.auth.currentUser.email
    }
    // simple try/catch to handle errors
    // the prev code should have populated the object, now we can add the doc
    try 
    {
      const newPet = await addDoc(
        collection(this.firestore, "petInfo"),
        {
          name: pet.name,
          bio: pet.bio,
      
          image: pet.image,
      
          species: pet.species,
          breed: pet.breed,
          age: pet.age,
          gender: pet.sex,
          weight: pet.weight,
          size: pet.size,
          program: pet.program,

          vacc: pet.vacc,
          vet: pet.vetHistory,
          med: pet.miscMed,

          misc: pet.miscInfo,

          contact: contact,

          uid: this.auth.currentUser.uid,
          petID: crypto.randomUUID(),
        },
      );
      this.navService.navigateToMyPets();
      return newPet;
    } 
    catch (error) 
    {
      console.error("Error writing new pet to Firebase Database", error);
      return;
    }
  }

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
