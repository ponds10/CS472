import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-box',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginBoxComponent { }
