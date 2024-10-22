import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [NavBarComponent, MatChipsModule, MatSliderModule, MatIcon],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {

}