import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

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

  constructor(){}

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
}
