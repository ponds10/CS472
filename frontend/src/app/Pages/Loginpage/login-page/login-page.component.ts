import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor() {

    // DEBUG: prints the value of the username/password in the console
    // as the input is changed
    this.loginForm.valueChanges.subscribe(data => {
      console.log(this.loginForm.controls.password.value);
      console.log(this.loginForm.controls.username.value);
    })
  }

  // login form declaration, binds username/password to the form
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  // function for when it is submitted
  submit_login(){
    // calls our API in the backend
  }


  
}
