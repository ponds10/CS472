import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavigationServiceService } from './navigation-service.service';

describe('NavigationServiceService', () => {
  let service: NavigationServiceService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']); // Mock Router's navigate method
    TestBed.configureTestingModule({
      providers: [
        NavigationServiceService,
        { provide: Router, useValue: spy },
      ],
    });

    service = TestBed.inject(NavigationServiceService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to login page', () => {
    service.navigateToLoginPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to home page', () => {
    service.navigateToHomePage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/homepage']);
  });

  it('should navigate to new account page', () => {
    service.navigateToNewAccountPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/newAccount']);
  });
});

// describe('NavigationServiceService', () => {
//   let service: NavigationServiceService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(NavigationServiceService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
