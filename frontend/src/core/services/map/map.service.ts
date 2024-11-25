import { Injectable, inject } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Subscription, timestamp } from 'rxjs';
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
  query,
  orderBy,
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
  image?: File | null;
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
    image: any | null
  ): Promise<void | DocumentReference<DocumentData>> => {
    // ignore empty description
    if (!description && !lat && !lng) {
      console.log(
        'addMarker was called without a all required fields:',
        lat,
        lng,

        description
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

      // lat: lat,
      // lng: lng,
      uid: this.currentUser.uid,
    };

    lat && (marker.lat = lat);
    lng && (marker.lng = lng);
    description && (marker.description = description);
    image && (marker.image = image);

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
  saveMarker = async (
    lat: number,
    lng: number,
    description: string,
    file: File | null
  ) => {
    // try {
    //   // 1 -  loading icon that will get updated with the shared image.
    //   const markerRef = await this.addMarker(
    //     null,
    //     null,
    //     null,
    //     null,
    //     this.LOADING_IMAGE_URL
    //   );

    let publicImageUrl = '';

    // upload image to cloud storage
    if (file) {
      const filePath = `map-images/${file.name}`;
      const newImageRef = ref(this.storage, filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      // 3 - Generate a public URL for the file.
      publicImageUrl = await getDownloadURL(newImageRef);
    }

    return this.addMarker(lat, lng, description, publicImageUrl);
  };

  loadMarkers = () => {
    const markers = query(
      collection(this.firestore, 'marker'),
      orderBy('timestamp', 'desc')
    );
    return collectionData(markers);
  };

  clicklat: string = '';
  clicklng: string = '';
  clickFlag: boolean = false;

  clickPosition = (event: google.maps.MapMouseEvent) => {
    this.clicklat = String(event.latLng?.lat());
    this.clicklng = String(event.latLng?.lng());
  };

  des: string = '';
  file: File | null = null;

  // update marker in Cloud Firestore
  async updateData(path: string, data: any) {}
}
