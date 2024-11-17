import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationServiceService } from '../../../../core/services/navService/navigation-service.service';
import { LoginService } from '../../../../core/services/login/login.service';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login-box',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginBoxComponent { 
  constructor(public navService: NavigationServiceService){}

  loginService = inject(LoginService);
  user$ = this.loginService.user$;

  // reactvie forms for the login-box component to easily monitor value changes
  // for the input tags
  fg_login = new FormGroup({
    password: new FormControl(''),
    email: new FormControl('')
  });

  // loginWithEmail
  // abstracts the service a little by validating inputs
  // better way to do input validation for the <input> tag but will refactor if needed
  loginWithEmail()
  {
    // get the email/password from the form group
    const email = this.fg_login.get('email')?.value;
    const password = this.fg_login.get('password')?.value;

    //debug printing
    console.log(email)
    console.log(password)

    // input validation, if either are null return false, otherwise return true
    // and use the service
    if(email == null || password == null)
    {
      // @if boolean here, if false than display "Error enter a valid email/password!"
      return false;
    }
    else{
      this.loginService.login_email(email, password);
      return true;
    }
  }
}
