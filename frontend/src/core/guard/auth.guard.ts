import { CanActivateFn } from '@angular/router';
import { NavigationServiceService } from '../services/navService/navigation-service.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const navigationService = inject(NavigationServiceService);

  try {
    // Check Firebase authentication state
    const user = await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((u) => {
        unsubscribe(); // Avoid memory leaks
        resolve(u);
      });
    });

    if (user) {
      return true; // User is authenticated
    } else {
      // Redirect to login if unauthenticated
      navigationService.navigateToLoginPage?.();
      await router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    console.error('Error in authGuard:', error);
    await router.navigate(['/login']);
    return false;
  }


  // ------ for testing only; will delete it later -------
  /*
  const isAuthenticated = false; // user not logged in

  if (isAuthenticated) {
    console.log('User is authenticated. Access granted.');
    return true;
  } else {
    console.log('User is not authenticated. Redirecting to login...');
    navigationService.navigateToLoginPage();
    return false;
  }
  */
};
