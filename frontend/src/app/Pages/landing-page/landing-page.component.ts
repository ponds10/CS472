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
  showDescription1 = true;
  showDescription2 = false;
  showDescription3 = false;

  description1: string = "desc 1";
  description2: string = "desc 2";
  description3: string = "desc 3";

  constructor(public navService: NavigationServiceService) {}

  // toggle description visibility
  toggleDescription(container: number) {
    if(container == 1)
    {
      this.showDescription1 = true;
      this.showDescription2 = this.showDescription3 = false;
    }
    else if(container == 2)
    {
      this.showDescription2 = true;
      this.showDescription1 = this.showDescription3 = false;
    }
    else if(container == 3)
    {
      this.showDescription3 = true;
      this.showDescription1 = this.showDescription2 = false;
    }
  }
}

