import { Component, OnInit, inject } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '@angular/fire/auth';
import { Events } from '../../../core/models/events';
import { EventsService } from '../../../core/services/event/events.service';
import { CalendarComponent } from './calendar/calendar.component';
import { ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [NavBarComponent, 
            HeaderComponent,
            ReactiveFormsModule,
            MatInputModule,
            MatIconModule,
            CalendarComponent
            ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit{
  // vars
  selectedImage: File | null = null; 
  userId: string | undefined = ''; 
  auth: Auth = inject(Auth);

  // this is for images
  image: File | null = null;
  url: string | null | ArrayBuffer = "./assets/images/event-page-sample-2.jpg";

  // output from child calendar here
  currentDay: string = ''
  currentYear: string = ''
  currentMonth: string = ''
  selectedTime: string = ''
  recieveDay(data: string){this.currentDay = data ;console.log(this.currentDay)}
  recieveMonth(data: string){this.currentMonth = data ;console.log(this.currentMonth)}
  recieveYear(data: string){this.currentYear = data ;console.log(this.currentYear)}
  date: Date | null = null;

  constructor(private eventService: EventsService){}

  // oninit 
  ngOnInit(): void {
    this.userId = this.auth.currentUser?.uid;
  }

  // make the form controls for each step in the creation page
  fg_event = new FormGroup({

    organizer: new FormControl(''),
    title: new FormControl(''),
    summary: new FormControl(''),


    date: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl(''),

    overview: new FormControl(''),
    misc: new FormControl(''),
  });

  // filechange event
  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }

    this.image = file;
    const imagePath = file;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e => {
      this.url = reader.result;
    })
  }

  timeChangeEvent(data: any) {
    const [hours, minutes] = data.split(':');  // Split input time into hours and minutes
    let hour = parseInt(hours, 10);
    let period = 'AM';  // Default to AM

    // Convert 24-hour time to 12-hour time
    if (hour >= 12) {
      period = 'PM';  // If the hour is 12 or more, it's PM
    }
    if (hour > 12) {
      hour -= 12;  // Convert hour to 12-hour format (13 -> 1, 14 -> 2, etc.)
    }
    if (hour === 0) {
      hour = 12;  // Special case: 00:xx is actually 12:xx AM
    }

    console.log(`${hour}:${minutes}:00 ${period}`)
    // Return the time in 12-hour format
    this.selectedTime = `${hour}:${minutes}:00 ${period}`;
    this.generateTimestamp();
  }

  generateTimestamp()
  {
    const dateTimeString = `${this.currentMonth} ${this.currentDay}, ${this.currentYear} at ${this.selectedTime} UTC-8`;
    const date = new Date(dateTimeString);
    this.date = date;
    console.log(Timestamp.fromDate(date))
  }

  createEvent()
  {
    const event: Events = 
    {
      organizer: this.fg_event.get('organizer')?.value as string,
      title: this.fg_event.get('title')?.value as string,
      summary: this.fg_event.get('summary')?.value as string,
      imageURL: '', // will be replaced
  
      date: this.date as Date,
      street: this.fg_event.get('street')?.value as string,
      city: this.fg_event.get('city')?.value as string,
      state: this.fg_event.get('state')?.value as string,
      zip: this.fg_event.get('zip')?.value as string,
      country: this.fg_event.get('country')?.value as string,
  
      misc: this.fg_event.get('misc')?.value as string,
      overview: this.fg_event.get('overview')?.value as string,
      attendance: 0,
      userID: this.auth.currentUser?.uid as string,
      eventID: '', //will be replaced
      
    }
    this.eventService.generateEvent(event, this.selectedImage as File)
  }
}
