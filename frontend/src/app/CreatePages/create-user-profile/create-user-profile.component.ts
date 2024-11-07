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
  steps: number[] = [1, 0, 0, 0, 0]
  current_step: number = 0;
  max: number = 0;

  fg_basic_info = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
  });


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
