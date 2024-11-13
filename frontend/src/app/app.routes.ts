import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
//import { EventPageComponent } from './Pages/event-page/event-page.component';
import { PetPageComponent } from './Pages/pet-page/pet-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { DocumentsPageComponent } from './DashboardPages/documents-page/documents-page.component';
import { SearchEventsPageComponent } from './Pages/search-events-page/search-events-page.component';
import { SearchPetsPageComponent } from './Pages/search-pets-page/search-pets-page.component';
import { SearchPetsFilterComponent } from './Pages/search-pets-filter/search-pets-filter.component';
import { CreatePetPostComponent } from './CreatePages/create-pet-post/create-pet-post.component';
import { CreateEventComponent } from './CreatePages/create-event/create-event.component';
import { UserProfilePageComponent } from './Pages/user-profile-page/user-profile-page.component';
import { PetListComponent } from './Pages/pet-list/pet-list.component';
import { MapPageComponent } from './Pages/map-page/map-page.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { CreateUserProfileComponent } from './CreatePages/create-user-profile/create-user-profile.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
   // {path: 'eventpage', component: EventPageComponent},
   // {path: 'eventpage/:id', component: EventPageComponent},  // Updated to accept event ID as a parameter
    {path: 'petlist/:id', component: PetPageComponent},
    {path: 'petlist', component: PetListComponent}, //the pets/results page is this, delete later
    {path: 'homepage', component: HomePageComponent},
    {path: 'documentspage', component: DocumentsPageComponent},
    {path: 'search/pets/filter', component: SearchPetsFilterComponent},
    {path: 'search/pets/results', component: SearchPetsPageComponent},
    {path: 'search/events', component: SearchEventsPageComponent},
    {path: 'create/pet-post', component: CreatePetPostComponent},
    {path: 'create/event', component: CreateEventComponent},
    {path: 'userprofilepage', component: UserProfilePageComponent},
    {path: 'map', component:MapPageComponent},
    {path: 'login', component:LoginPageComponent},
    {path: 'newAccount', component:NewAccountComponent},
    {path: 'createUser', component:CreateUserProfileComponent},
    {path: '**', redirectTo:'login'}
];
