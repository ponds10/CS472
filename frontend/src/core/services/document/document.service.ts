import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import {
  collectionData, Firestore, Timestamp,
  addDoc, collection, query, orderBy, limit,
  where, getDoc, startAfter,
  DocumentReference,
  DocumentData,
  FieldValue,
  serverTimestamp,
  updateDoc,
  increment,
  setDoc,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Events } from '../../models/events';
import { NavigationServiceService } from '../navService/navigation-service.service';
import { document } from '../../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // inject the dependencies
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  storage: Storage = inject(Storage);

  // the selected file
  selectedFile: File | null | undefined = null;

  // constructor
  constructor() { }

  // checkeUserLoggedIn(): checks if there is a current user in the auth, false for no true for yes
  checkUserLoggedIn() {
    if (this.auth.currentUser == null || this.auth.currentUser == undefined) {
      return false;
    }

    return true;
  }

  // async upload
  // checks if user, then trys to upload to storage and get a url link, then try to upload to firebase
  async uploadFile() {
    let url: string | null = null;

    // if the current user is null then return
    if (!this.checkUserLoggedIn()) {
      return;
    }


    try {
      // make a storage ref put it in the users bucket in a folder named with the users UID
      // then upload it using the uploadBytes resumable
      const storageref = ref(this.storage, `documents/${this.auth.currentUser?.uid}/${this.selectedFile?.name}`)
      const fileSnapshot = await uploadBytesResumable(storageref, this.selectedFile!);

      // this gets the url, which we can store in a table
      url = await getDownloadURL(storageref);
    }
    catch (error) {
      console.log("Error uploading file to storage")
      return error;
    }

    // create the document object based on model
    const document: document =
    {
      userID: this.auth.currentUser?.uid!,
      publicFileURL: url,
      type: "medical"
    }

    // simple try/catch to handle errors
    // the prev code should have populated the object, now we can add the doc
    try {
      const newEvent = await addDoc(
        collection(this.firestore, "documents"), document,
      );

      return newEvent;
    }
    catch (error) {
      console.error("Error writing new event to Firebase Database", error);
      return;
    }
  }
  // deletes a file 
  // FIX TENTATIVE
  async deleteFile(fileName: string): Promise<void> {
    try {
      // first remove from storage
      const storageref = ref(this.storage, `documents/${this.auth.currentUser?.uid}/${this.selectedFile?.name}`)
      // use old storage ref
      await deleteObject(storageref);
      console.log("File ${filePath} removed from storage");

      // second remove the document from Firestore
      const docRef = doc(this.firestore, `documents/${fileName}`);
      await deleteDoc(docRef);
      console.log("File ${fileName} removed from firestore");

      // decrement the total count of documents, then update the total count of files
      const totalsRef = doc(this.firestore, `totals/${this.auth.currentUser?.uid}`);
      const totalsDoc = await getDoc(totalsRef); // getDoc for a single document
      if (totalsDoc.exists()) {
        await updateDoc(totalsRef, { count: increment(-1) });
      } else {
        console.log("Unable to calculate total count of documents.");
      }
    } catch (error) {
      console.log("Error deleting file");
      throw error;
    }
  }
