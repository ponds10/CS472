import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { EventsService } from '../../../core/services/event/events.service';
import { Events } from '../../../core/models/events';
import { Timestamp } from '@angular/fire/firestore';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { User } from '../../../core/models/user';
import { ActivatedRoute } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { from } from 'rxjs';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css'],
  standalone: true,
  imports: [HeaderComponent, NavBarComponent, CommonModule, MatChipsModule, MatIcon, MatIconModule]
})
export class EventPageComponent implements OnInit{
    // constructor for the services
    constructor(private eventService: EventsService, 
                private navService: NavigationServiceService,
                private route: ActivatedRoute
              ){}

    // variables for the page that we are essentially getting from the service
    selectedEvent: Events | null = null;
    eventDate: Date | null = null;
    organizer: User | null = null;

    ngOnInit(): void {
        // if the selected event is null or undefined, query the database

        if(this.eventService.selectedEvent == null || this.eventService.selectedEvent == undefined)
        {
          // from the active route, get the mapped query parameters
          // get the eventid
          this.route.queryParamMap.subscribe((data) => {
            // with the eventid subscribe to the get selected event
            // its a simple query that returns an array of events, but really its only one event
            // just index 0 to get it
            this.eventService.getSelectedEvent(data.get('eventid')!).subscribe((data: Events[]) => {
              this.selectedEvent = data[0];
            })
          })
        }
        // get the selected event, make the time stamp, and the date
        this.selectedEvent = this.eventService.selectedEvent;
        const eventTimestamp = this.selectedEvent?.date as Timestamp;
        this.eventDate = eventTimestamp.toDate();

        // subscribe to the getOrganizer, so we can populate the user images in the posts
        this.eventService.getOrganizer(this.selectedEvent!.userID).subscribe((data: User[]) => {
          this.organizer = data[0]
          console.log(data[0])
        })

    }

    // gets the month, depending on the num
    // use the switch to return the month name
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

    // simplet returns the date
    getDay()
    {
      return this.eventDate?.getDate()
    }

    // returns a true/false boolean that determines whether or not 
    attending()
    {
      return this.eventService.checkAttendance(this.selectedEvent!);
    }

    rsvpEvent()
    {
      this.eventService.attendEvent(this.selectedEvent!)
      this.eventService.attendedEvents?.push(this.selectedEvent!)
    }
}
