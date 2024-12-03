import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../../core/services/event/events.service';
import { Events } from '../../../core/models/events';
import { EventcardComponent } from './eventcard/eventcard.component';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { MatIcon } from '@angular/material/icon';
import { transition, query, style, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-search-events-page',
  templateUrl: './search-events-page.component.html',
  styleUrls: ['./search-events-page.component.css'],
  standalone: true,
  imports: [HeaderComponent, NavBarComponent, RouterModule, CommonModule, EventcardComponent, MatIcon],
  animations: [
    trigger('load', [
      transition(':enter', [style({opacity: 0}), animate('1000ms', style({opacity: 1}))]),
      transition(':leave', [animate('1000ms', style({opacity: 0}))]),
    ]),
  ]
})
export class SearchEventsPageComponent implements OnInit{
  events: Events[] | null = null;
  full_events: Events[] | null = null;
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
      this.full_events = data;
    })
  }


  // store the state in the service and then go to the component that renders it
  selectEvent(event: Events)
  {
    this.eventService.selectedEvent = event;
    this.navService.naviageToEventPage(event.eventID);
    return;
  }
  
  // simple wrapper to nav to create event function, since the service is private
  createEvent()
  {
    this.navService.navigateToCreateEvent();
  }

  // filter events function
  // takes in a string, checks if full events is null, if so return
  // otherwise, empty the events array, and find any event with a title that matches
  filterEvents(input: HTMLInputElement)
  {
    this.events = [];

    const value = input.value;

    console.log(value)
    console.log("hello")
    for(const event of this.full_events!)
    {
      if(event.title.includes(value) || event.summary.includes(value))
      {
        this.events.push(event);
      }
    }
  }
}
