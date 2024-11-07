import { Injectable, inject } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { DocumentReference, DocumentData, FieldValue, serverTimestamp } from '@angular/fire/firestore';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


  type Marker = {
    name: string | null;
    profilePicUrl: string | null;
    timestamp: FieldValue;
    title: string | null;
    description: string | null;
    imageUrl: string | null;
    lat: number | null;
    lng: number | null;
    uid: string;
  };

@Injectable({
  providedIn: 'root'
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
    title: string | null, 
    description: string | null, 
    imageUrl: string | null 
  ): Promise<void | DocumentReference<DocumentData>> => {
    
    // ignore empty description
    if (!description && !imageUrl) {
      console.log(
        'addMarker was called without a description or location',
        description,
        imageUrl
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
      title: title,
      description: description,
      imageUrl: imageUrl,
      lat: lat,
      lng: lng,
      uid: this.currentUser.uid,
    };

    description && (marker.description = description);
    imageUrl && (marker.imageUrl = imageUrl);

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


  // update marker in Cloud Firestore
  async updateData(path: string, data: any) {}
 
}
