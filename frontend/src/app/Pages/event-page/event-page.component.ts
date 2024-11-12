// import { HeaderComponent } from '../../../shared/header/header.component';
// import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

// import { EventService } from '../../services/event.service';

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatChipsModule } from '@angular/material/chips';

// @Component({
//   selector: 'app-event-page',
//   templateUrl: './event-page.component.html',
//   styleUrls: ['./event-page.component.css'],
//   standalone: true,
//   imports: [HeaderComponent, NavBarComponent, CommonModule, MatChipsModule]
// })
// export class EventPageComponent implements OnInit {
//   selectedEvent: any = {
//     isRegistered: false
//   };
//   userLoggedIn: boolean = false;

//   registerForEvent() {
//     if (!this.userLoggedIn) {
//       alert("Please log into register for the event.");
//     } else {
//       this.selectedEvent.isRegistered = true;
//     }
//   }

//   constructor(
//     private route: ActivatedRoute,
//     private eventService: EventService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // get the event ID from the route parameters
//     const eventId = this.route.snapshot.paramMap.get('id');
//     if (eventId) {
//       // fetch the event details from the service using the event ID
//       this.eventService.getEventById(eventId).subscribe((event) => {
//         this.selectedEvent = event;
//       });
//     }
//   }
// }
