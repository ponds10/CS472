import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NavigationServiceService } from '../services/navService/navigation-service.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: { currentUser: null } }, // Default to unauthenticated
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: NavigationServiceService,
          useValue: jasmine.createSpyObj('NavigationServiceService', ['navigateToLoginPage']),
        },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access when the user is authenticated', async () => {
    const mockUser: User = {
      uid: '00000',
      emailVerified: true,
      isAnonymous: false,
      metadata: {} as any,
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: jasmine.createSpy('delete'),
      getIdToken: jasmine.createSpy('getIdToken'),
      getIdTokenResult: jasmine.createSpy('getIdTokenResult'),
      reload: jasmine.createSpy('reload'),
      toJSON: jasmine.createSpy('toJSON'),
      displayName: null,
      email: null,
      phoneNumber: null,
      photoURL: null,
      providerId: '',
    };

    // Override the Auth provider to simulate an authenticated user
    TestBed.overrideProvider(Auth, { useValue: { currentUser: mockUser } });

    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    if (result instanceof Promise) {
      const resolvedResult = await result;
      expect(resolvedResult).toBeTrue();
    } else {
      expect(result).toBeTrue();
    }
  });

  it('should redirect when the user is not authenticated', async () => {
    const mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    const mockNavigationService = TestBed.inject(
      NavigationServiceService
    ) as jasmine.SpyObj<NavigationServiceService>;

    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    if (result instanceof Promise) {
      const resolvedResult = await result;
      expect(resolvedResult).toBeFalse();
    } else {
      expect(result).toBeFalse();
    }
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(mockNavigationService.navigateToLoginPage).toHaveBeenCalled();
  });
});
