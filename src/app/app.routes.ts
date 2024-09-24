import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/Homepage/home-page/home-page.component';
import { LoginPageComponent } from './Pages/Loginpage/login-page/login-page.component';
export const routes: Routes = [
    {path: '', component:HomePageComponent},
    {path: 'login', component:LoginPageComponent}
];
