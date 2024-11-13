import { CanActivateFn } from '@angular/router';
import { NavigationServiceService } from '../services/navService/navigation-service.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
