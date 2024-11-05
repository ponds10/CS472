import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  // set up basic router 
  constructor(private router: Router) { }

  // nav to login page func
  navigateToLoginPage()
  {
    this.router.navigate(['/login'])
  }

  // nav to home page func
  navigateToHomePage()
  {
    this.router.navigate(['/homepage'])
  }

  navigateToNewAccountPage()
  {
    this.router.navigate(['/newAccount'])
  }
}
