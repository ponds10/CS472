import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
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
      this.router.navigate(['/', 'homepage']);
      return credential;
    });
  }

  // Logout of Friendly Chat.
  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/', 'login']);
        console.log('signed out');
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }
}
