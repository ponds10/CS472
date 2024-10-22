import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from "../../../shared/header/header.component";
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component.spec';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [NavBarComponent, HeaderComponent, EventCardComponent, MatChipsModule, MatSliderModule, MatIcon],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {
  constructor(private router: Router){}

  navigateToPetPage()
  {
    this.router.navigate(['/eventpage'], {queryParams: null})
  }

}
