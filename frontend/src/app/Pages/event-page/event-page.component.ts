import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { EventsService } from '../../../core/services/event/events.service';
import { Events } from '../../../core/models/events';
import { Timestamp } from '@angular/fire/firestore';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
  standalone: true,
  imports: [HeaderComponent, NavBarComponent, CommonModule, MatChipsModule]
})
export class EventPageComponent implements OnInit{
    constructor(private eventService: EventsService, private navService: NavigationServiceService){}
    selectedEvent: Events | null = null;
    eventDate: Date | null = null;

    ngOnInit(): void {
        console.log(this.selectedEvent)
        if(this.eventService.selectedEvent == null || this.eventService.selectedEvent == undefined)
        {
          this.navService.navigateToSearchEventPage();
        }
        this.selectedEvent = this.eventService.selectedEvent;
        const eventTimestamp = this.selectedEvent?.date as Timestamp;
        this.eventDate = eventTimestamp.toDate();

    }

    getMonth()
    {
    switch(this.eventDate?.getMonth())
    {
      case 0: return "January"; break;
      case 1: return "February"; break;
      case 2: return "March"; break;
      case 3: return "April"; break;
      case 4: return "May"; break;
      case 5: return "June"; break;
      case 6: return "July"; break;
      case 7: return "August"; break;
      case 8: return "September"; break;
      case 9: return "October"; break;
      case 10: return "November"; break;
      case 11: return "December"; break;
      default: return; break;
    }
  }

  getDay()
  {
    return this.eventDate?.getDate()
  }
}
