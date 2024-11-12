import { Injectable, inject } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import {
  DocumentReference,
  DocumentData,
  FieldValue,
  serverTimestamp,
  Firestore,
  collection,
  addDoc,
  updateDoc,
  setDoc,
  collectionData,
} from '@angular/fire/firestore';

import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

type Marker = {
  name: string | null;
  profilePicUrl: string | null;
  timestamp: FieldValue;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  lat?: number | null;
  lng?: number | null;
  uid: string;
};

@Injectable({
  providedIn: 'root',
})
export class MapService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  storage: Storage = inject(Storage);
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;


  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
    });
  }

  // add marker from map to Cloud Firestore
  addMarker = async (
    lat: number | null,
    lng: number | null,
    
    description: string | null,
    //imageUrl: string | null
  ): Promise<void | DocumentReference<DocumentData>> => {
    // ignore empty description
    if (!description  && !lat && !lng) {
      console.log(
        'addMarker was called without a all required fields:',
        lat,
        lng,
        
        description,
        
      );
      return;
    }

    if (this.currentUser === null) {
      console.log('addMessage requires a signed-in user');
      return;
    }

    const marker: Marker = {
      name: this.currentUser.displayName,
      profilePicUrl: this.currentUser.photoURL,
      timestamp: serverTimestamp(),
      // title: title,
      // description: description,
      // imageUrl: imageUrl,
      // lat: lat,
      // lng: lng,
      uid: this.currentUser.uid,
    };

    
    lat && (marker.lat = lat);
    lng && (marker.lng = lng);
    description && (marker.description = description);
    //imageUrl && (marker.imageUrl = imageUrl);

    try {
      const newMarkerRef = await addDoc(
        collection(this.firestore, 'marker'),
        marker
      );
      return newMarkerRef;
    } catch (error) {
      console.error('Error posting new marker to Firebase Database', error);
      return;
    }
  };

  // Saves a new message containing an image in Firestore.
  // This first saves the image in Firebase storage.
  saveMarker = async (lat: number, lng: number, description: string) => {
    // try {
    //   // 1 -  loading icon that will get updated with the shared image.
    //   const markerRef = await this.addMarker(
    //     null,
    //     null,
    //     null,
    //     null,
    //     this.LOADING_IMAGE_URL
    //   );

      return this.addMarker( lat, lng, description);
    
  };

  // update marker in Cloud Firestore
  async updateData(path: string, data: any) {}
}

