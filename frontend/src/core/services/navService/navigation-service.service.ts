import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {
  // set up basic router
  constructor(private router: Router) { }

  // nav to login page func
  navigateToLoginPage()
  {
    this.router.navigate(['/login']);
  }

  // nav to home page func
  navigateToHomePage()
  {
    // if currentuser from auth is null then go to login or landing otherwise homepage
    this.router.navigate(['/homepage']);
  }

  navigateToNewAccountPage()
  {
    this.router.navigate(['/newAccount']);
  }

  naviageToEventPage()
  {
    this.router.navigate(['/event']);
  }
}
