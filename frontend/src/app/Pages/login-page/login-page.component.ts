import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginBoxComponent } from '../../components/login-box/login-box.component';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginBoxComponent
  ],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  
 }
