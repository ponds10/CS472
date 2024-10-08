import { Routes } from '@angular/router';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { EventPageComponent } from './Pages/event-page/event-page.component';
import { PetPageComponent } from './Pages/pet-page/pet-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { DocumentsPageComponent } from './Pages/documents-page/documents-page.component';

export const routes: Routes = [
    {path: '', component: LandingPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'eventpage', component: EventPageComponent},
    {path: 'petpage', component: PetPageComponent},
    {path: 'homepage', component: HomePageComponent},
    {path: 'documentspage', component: DocumentsPageComponent}
];
