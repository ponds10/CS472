import { Component, OnInit, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { profileImages, User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user/user.service';
import { from } from 'rxjs';
import { unwatchFile } from 'fs';
import { LoginService } from '../../../core/services/login/login.service';
@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    NavBarComponent,
    MatChipsModule,
    MatSliderModule,
    MatIcon,
    HeaderComponent,
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent implements OnInit {
  user: User | null | undefined = null;
  image: profileImages | null | undefined = null;
  loginService = inject(LoginService);
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.image = this.userService.currentImage;

    if (this.user == null || this.user == undefined) {
      // use the from() from rxjs to transform the promise into an observable
      // than subscribe to it
      from(this.userService.getUserInfo()).subscribe((data) => {
        // lets say the observable returns before the currentUser gets assigned
        // in some strange world lol => the returned data should be good

        this.user = this.userService.currentUser;
      });
    }

    // checking again here for the profile image
    // if it is still null after the last check e.g. the user was loaded but the image wasnt
    // then call the userservice's get profile image and subscribe to the data
    if (this.image == null || this.image == undefined) {
      from(this.userService.getProfileImage()).subscribe((data) => {
        this.image = this.userService.currentImage;
      });
    }
  }
}
