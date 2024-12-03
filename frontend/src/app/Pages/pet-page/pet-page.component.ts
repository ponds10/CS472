import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for ngif and ngfor
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { Pet } from '../../../core/models/pet.model';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../core/services/user/user.service';
import { profileImages, User } from '../../../core/models/user';
import { from } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, HeaderComponent, MatIcon, MatListModule, MatIconModule, MatCardModule],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css',
})
export class PetPageComponent implements OnInit {
  constructor(private readonly userService: UserService) {}
  user: User | null | undefined = null;
  image: profileImages | null | undefined = null;
  pet: Pet | null = null;

  ngOnInit(): void {
    // get pet from local storage saved from search pet filters page
    this.pet = JSON.parse(sessionStorage.getItem('selectedPet') as string);

    // get user
    this.user = this.userService.currentUser;
    this.image = this.userService.currentImage;
    if (this.user == null || this.user == undefined) {
      // use the from() from rxjs to transform the promise into an observable
      // than subscribe to it
      from(this.userService.getUserInfo()).subscribe((data) => {
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
