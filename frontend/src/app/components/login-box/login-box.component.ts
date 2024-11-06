import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { LoginService } from '../../../core/services/login/login.service';

@Component({
  selector: 'app-login-box',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginBoxComponent { 
  constructor(public navService: NavigationServiceService){}

  loginService = inject(LoginService);
  user$ = this.loginService.user$;
}
