import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { EventPageComponent } from './Pages/event-page/event-page.component';
import { PetPageComponent } from './Pages/pet-page/pet-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { DocumentsPageComponent } from './DashboardPages/documents-page/documents-page.component';
import { SearchEventsPageComponent } from './Pages/search-events-page/search-events-page.component';
import { SearchPetsPageComponent } from './depreciated/search-pets-page/search-pets-page.component';
import { SearchPetsFilterComponent } from './Pages/search-pets-filter/search-pets-filter.component';
import { CreatePetPostComponent } from './CreatePages/create-pet-post/create-pet-post.component';
import { CreateEventComponent } from './CreatePages/create-event/create-event.component';
import { UserProfilePageComponent } from './Pages/user-profile-page/user-profile-page.component';
import { PetListComponent } from './Pages/pet-list/pet-list.component';
import { MapPageComponent } from './Pages/map-page/map-page.component';
import { CreateAccountComponent } from './Pages/create-account/create-account.component';
import { CreateUserProfileComponent } from './CreatePages/create-user-profile/create-user-profile.component';
import { authGuard } from '../core/guard/auth.guard';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'event', component: EventPageComponent},
   // {path: 'eventpage/:id', component: EventPageComponent},  // Updated to accept event ID as a parameter
    {path: 'petlist/:id', component: PetPageComponent, canActivate: [authGuard]},
    {path: 'petlist', component: PetListComponent, canActivate: [authGuard]}, //the pets/results page is this, delete later
    {path: 'homepage', component: HomePageComponent, canActivate: [authGuard]},
    {path: 'documentspage', component: DocumentsPageComponent, canActivate: [authGuard]},
    {path: 'search/pets/filter', component: SearchPetsFilterComponent, canActivate: [authGuard]},
    {path: 'search/pets/results', component: SearchPetsPageComponent, canActivate: [authGuard]},
    {path: 'search/events', component: SearchEventsPageComponent, canActivate: [authGuard]},
    {path: 'create/pet-post', component: CreatePetPostComponent, canActivate: [authGuard]},
    {path: 'create/event', component: CreateEventComponent, canActivate: [authGuard]},
    {path: 'userprofilepage', component: UserProfilePageComponent, canActivate: [authGuard]},
    {path: 'map', component:MapPageComponent, canActivate: [authGuard]},
    {path: 'newAccount', component:CreateAccountComponent},
    {path: 'createUser', component:CreateUserProfileComponent, canActivate: [authGuard]},
    {path: '**', redirectTo:'login'},
];
