import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HomeCardComponent } from '../../../shared/components/home-card/home-card.component';
import { HeaderComponent } from "../../../shared/header/header.component";
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent, HomeCardComponent, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
