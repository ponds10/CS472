import { Component, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user/user.service';
@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [NavBarComponent, MatChipsModule, MatSliderModule, MatIcon, HeaderComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent implements OnInit{
  user: User | null = null;
  constructor(private userService: UserService)
  {
  }

  
  ngOnInit(): void {
    this.user = this.userService.get_sample_user();
  }

}