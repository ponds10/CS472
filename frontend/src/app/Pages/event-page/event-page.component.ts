import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { EventCardComponent } from '../../../shared/components/event-card/event-card.component.spec';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [NavBarComponent, EventCardComponent, MatChipsModule, MatSliderModule, MatIcon],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

}
