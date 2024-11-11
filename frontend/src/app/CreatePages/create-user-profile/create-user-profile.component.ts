import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user/user.service';
import { Auth } from '@angular/fire/auth';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-create-user-profile',
  standalone: true,
  imports: [HeaderComponent, MatIcon, ReactiveFormsModule],
  templateUrl: './create-user-profile.component.html',
})
export class CreateUserProfileComponent {
  // var declarations that control the forms step output
  // utilizes truthy values with the @if directives
  steps: number[] = [1, 0, 0, 0, 0]
  current_step: number = 0;
  max: number = 0;

  constructor(private userService: UserService, private auth: Auth){
    auth = inject(Auth);
  }

  // form groups for each step that will later be used to 
  // query info and then store in the userinfo data on firestore
  fg_basic_info = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
  });

  fg_bio = new FormGroup({
    bio: new FormControl(''),
  });

  fg_contactInfo = new FormGroup({
    phone: new FormControl(''),
    email: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
  });

  // next and back
  // click functions that change the steps[] by changing the truthy values!
  next()
  {
    if(this.current_step + 1 == this.max){return;}

    this.steps[this.current_step]=0;
    this.current_step++;
    this.steps[this.current_step]=1
  }
  back()
  {
    if(this.current_step == 0){return;}
    this.steps[this.current_step]=0;
    this.current_step--;
    this.steps[this.current_step]=1
  }

  finalizeInfo()
  {
    const userInfo: User = 
    {
      first_name: this.fg_basic_info.get('fname')?.value ?? '',
      last_name: this.fg_basic_info.get('lname')?.value ?? '',
      biography: this.fg_bio.get('bio')?.value ?? '',
      phone: this.fg_contactInfo.get('phone')?.value ?? '',
      email: this.fg_contactInfo.get('email')?.value ?? '',
      street: this.fg_contactInfo.get('street')?.value ?? '',
      city: this.fg_contactInfo.get('city')?.value ?? '',
      state: this.fg_contactInfo.get('state')?.value ?? '',
      zip: this.fg_contactInfo.get('zip')?.value ?? '',
      accountType: 'testing',
      userID: this.auth.currentUser?.uid ?? ''

    }

    this.userService.generateAccount(userInfo, this.selectedImage!);
  }

  selectedImage: File | null = null; // Store the selected image file
  uploadProgress: number = 0; // Track upload progress
  userId: string = 'USERID';  // Replace with the actual user ID (e.g., from Firebase Authentication)

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
}
