import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginBoxComponent } from '../../components/login-box/login-box.component';
import { HeaderComponent } from "../../../shared/header/header.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginBoxComponent,
    HeaderComponent
],
  templateUrl: './landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent { }
