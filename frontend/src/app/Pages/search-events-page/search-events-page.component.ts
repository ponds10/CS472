import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component.spec';
import { HeaderComponent } from '../../../shared/header/header.component';
@Component({
  selector: 'app-search-events-page',
  standalone: true,
  imports: [NavBarComponent, EventCardComponent, HeaderComponent],
  templateUrl: './search-events-page.component.html',
  styleUrl: './search-events-page.component.css'
})
export class SearchEventsPageComponent {

}
