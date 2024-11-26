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
      // Show alert for unauthenticated access attempt
      window.alert('Access denied. Please log in to view this page.');
      // Redirect to login if unauthenticated
      navigationService.navigateToLoginPage?.();
      await router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    console.error('Error in authGuard:', error); // For debugging purpose; will delete it later
    window.alert('An error occurred. Redirecting to login.');  // Show alert for any error
    await router.navigate(['/login']);
    return false;
  }
}