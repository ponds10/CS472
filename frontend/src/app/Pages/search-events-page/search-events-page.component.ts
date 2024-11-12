// import { HeaderComponent } from '../../../shared/header/header.component';
// import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

// import { EventService } from '../../services/event.service';
// import { Event } from '../../models/event.model';

// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-search-events-page',
//   templateUrl: './search-events-page.component.html',
//   styleUrls: ['./search-events-page.component.css'],
//   standalone: true,
//   imports: [HeaderComponent, NavBarComponent, RouterModule, CommonModule]
// })
// export class SearchEventsPageComponent implements OnInit {
//   events: Event[] = [];  // Array to store fetched events

//   constructor(private eventService: EventService) {}

//   ngOnInit(): void {
//     // Fetch events and log them to confirm data retrieval
//     this.eventService.getEvents().subscribe((events) => {
//       console.log('Fetched events:', events);  // Debugging log
//       this.events = events;
//     });
//   }
// }
