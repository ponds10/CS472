import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { MatIconModule } from '@angular/material/icon';
import { EventsCalendarComponent } from '../home-page/events-calendar/events-calendar.component';
import { EventsService } from '../../../core/services/event/events.service';
import { Events } from '../../../core/models/events';
@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [NavBarComponent, HeaderComponent, MatIconModule, EventsCalendarComponent],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent implements OnInit {
  hostedEvents: null | Events[] = null
  paginatedHostedEvents: null | Events[] = null;

  itemsPerPage: number = 4;
  currentPage: number = 0;
  length: number = 0;

  constructor(private navService: NavigationServiceService,
              private eventService: EventsService
  ){}

  ngOnInit(): void {
    this.eventService.getHostingEvents().subscribe((data: Events[]) => {
      this.hostedEvents = data;

      this.length = data.length;

      const stIndex:number = this.currentPage * this.itemsPerPage;
      let edIndex:number = stIndex + this.itemsPerPage;
      if(edIndex > this.length)
      {
        edIndex = this.length;
      }

      this.paginatedHostedEvents = this.hostedEvents.slice(stIndex, edIndex)
    })
  }

  selectEvent(event: Events)
  {
    this.eventService.selectedEvent = event;
    this.navService.naviageToEventPage(event.eventID);
    return;
  }

  nextPage()
  {
    if((this.currentPage+1) * this.itemsPerPage >= this.length)
    {
      return; 
    }
    this.currentPage++;
    const stIndex:number = this.currentPage * this.itemsPerPage;
    let edIndex:number = stIndex + this.itemsPerPage;
    if(edIndex > this.length)
    {
      edIndex = this.length;
    }

    this.paginatedHostedEvents = this.hostedEvents!.slice(stIndex, edIndex)
  }

  previousPage()
  {
    if(this.currentPage == 0)
    {
      return;
    }

    this.currentPage--;
    const stIndex:number = this.currentPage * this.itemsPerPage;
    let edIndex:number = stIndex + this.itemsPerPage;
    if(edIndex > this.length)
    {
      edIndex = this.length;
    }

    this.paginatedHostedEvents = this.hostedEvents!.slice(stIndex, edIndex)
  }
}
