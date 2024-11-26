import { Injectable, inject } from '@angular/core';
import {
  Auth,
  user,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  private provider = new GoogleAuthProvider();

  // observable that is updated when the auth state changes
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
    });
  }

  // Login Friendly Chat.
  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);

      // debug
      console.log(this.auth.currentUser?.uid);

      // from() to turn the promise into an observable (easier to handle, probs need to refactor this)
      // subscribe to await for the results, if false => no UID found they are a new user
      // navigate to the create user page!
      from(this.searchUID(this.auth.currentUser?.uid)).subscribe((data) => {
        if (!data) {
          this.router.navigate(['/', 'createUser']);
        } else {
          this.router.navigate(['/', 'homepage']);
        }
      });
      return credential;
    });
  }

  // Logout of Friendly Chat.
  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/', '']);
        console.log('signed out');
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }

  // async/await function searchUID (should probably change it to return an observable)
  // takes in the UUID from after the user logs in
  // makes a query and then gets a snapshop => iterates through it, if one is found than return true
  // otherwise return false
  async searchUID(UUID: string | undefined) {
    let flag: boolean = false;
    if (UUID === null || UUID === undefined) {
      console.log('requires a user');
      return false;
    }

    const newUserQuery = query(
      collection(this.firestore, 'userInfo'),
      where('userID', '==', UUID),
      limit(12)
    );

    const snapshot = await getDocs(newUserQuery);
    snapshot.forEach((doc) => {
      console.log('testing foreach');
      flag = true;
    });

    // debug
    // console.log("herro")
    // console.log(snapshot.docs)

    return flag;
  }

  login_email(email: string, password: string) {
    // built in method from angular/core that takes in the auth, email, and password
    // returns the UID of the user, but we should be able to access it through the auth injection
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.currentUser = this.auth.currentUser;
      console.log(this.currentUser);
    });

    // debug printing
    console.log(this.auth.currentUser?.uid);

    // if the UID is null or undefined, then do not reroute and return false
    // return true otherwise
    if (
      !(
        this.auth.currentUser?.uid == null ||
        this.auth.currentUser?.uid == undefined
      )
    ) {
      this.router.navigate(['/', 'homepage']);
      return true;
    }

    // for the login box, we need to have an @if that utilizes a boolean to display an error message like
    // login failed!
    return false;
  }

  create_account_email(email: string, password: string) {
    // use the built in create account with email/pw from fb
    // pass in the auth, email, and password
    // then we can get the returned user credential and log it for debug
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.currentUser = this.auth.currentUser;
        console.log(userCredential);
        this.router.navigate(['/', 'createUser']);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return false;
      });
  }
}
