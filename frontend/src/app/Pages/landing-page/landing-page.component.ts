import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginBoxComponent } from '../login-page/login-box/login-box.component';
import { HeaderComponent } from "../../../shared/header/header.component";
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginBoxComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LandingPageComponent {
  // control the visibility of the descriptions
  showDescription1 = false;
  showDescription2 = false;
  showDescription3 = false;

  constructor(public navService: NavigationServiceService) {}

  // toggle description visibility
  toggleDescription(container: number) {
    if (container === 1) this.showDescription1 = !this.showDescription1;
    else if (container === 2) this.showDescription2 = !this.showDescription2;
    else if (container === 3) this.showDescription3 = !this.showDescription3;
  }
}

