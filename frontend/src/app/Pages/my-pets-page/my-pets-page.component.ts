import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-my-pets-page',
  standalone: true,
  imports: [MatIcon, HeaderComponent, NavBarComponent],
  templateUrl: './my-pets-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPetsPageComponent {
  constructor(public navService: NavigationServiceService) {}
}
