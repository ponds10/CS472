import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../../core/services/event/events.service';
import { Events } from '../../../core/models/events';
import { EventcardComponent } from './eventcard/eventcard.component';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-search-events-page',
  templateUrl: './search-events-page.component.html',
  styleUrls: ['./search-events-page.component.css'],
  standalone: true,
  imports: [HeaderComponent, NavBarComponent, RouterModule, CommonModule, EventcardComponent, MatIcon]
})
export class SearchEventsPageComponent implements OnInit{
  events: Events[] | null = null;

  constructor(private eventService: EventsService, private navService: NavigationServiceService) {}

  testing()
  {
    this.eventService.getInitalEvents().subscribe((data: Events[]) => {
      this.events = data;
      console.log(this.events)
    })
  }

  

  ngOnInit(): void {
    this.eventService.getInitalEvents().subscribe((data: Events[]) => {
      this.events = data;
    })
  }

  selectEvent(event: Events)
  {
    this.eventService.selectedEvent = event;
    this.navService.naviageToEventPage();
    return;
  }

  createEvent()
  {
    this.navService.navigateToCreateEvent();
  }
}
