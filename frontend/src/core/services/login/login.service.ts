import { Injectable, inject } from '@angular/core';
import { Auth, user, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Subscription, Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, orderBy, limit, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
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

      // debug
      console.log(this.auth.currentUser?.uid);
        
      // from() to turn the promise into an observable (easier to handle, probs need to refactor this)
      // subscribe to await for the results, if false => no UID found they are a new user
      // navigate to the create user page!
      from(this.searchUID(this.auth.currentUser?.uid)).subscribe((data) => {
        if(data){
          this.router.navigate(['/', 'createUser']);
        }
        else
        {
          this.router.navigate(['/', 'homepage']);
        }
      })
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

  // async/await function searchUID (should probably change it to return an observable)
  // takes in the UUID from after the user logs in
  // makes a query and then gets a snapshop => iterates through it, if one is found than return true
  // otherwise return false
  async searchUID(UUID: string | undefined)
  {
    if (UUID === null || UUID === undefined ) {
      console.log("requires a user");
      return true;
    }

    const newUserQuery = query(collection(this.firestore, 'userInfo'), where("userID", "==", UUID), limit(12));

    const snapshot = await getDocs(newUserQuery);
    snapshot.forEach((doc) => 
    {
      return true;
    })

    // debug
    console.log("herro")

    return false;
  }
}
