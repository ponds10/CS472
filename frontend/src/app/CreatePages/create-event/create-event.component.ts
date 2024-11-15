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
  selectedImage: File | null = null; 
  userId: string | undefined = ''; 
  auth: Auth = inject(Auth);

  image: File | null = null;
  url: string | null | ArrayBuffer = "./assets/images/event-page-sample-2.jpg";


  constructor(private eventService: EventsService){}

  ngOnInit(): void {
    this.userId = this.auth.currentUser?.uid;
  }

  // make the form controls for each step in the creation page
  fg_event = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    host: new FormControl('')
  });

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

  createEvent()
  {

    // const event: Events = 
    // {
    //   host: this.fg_basic_info.get('host')!.value as string,
    //   title: this.fg_basic_info.get('title')!.value as string,
    //   description: this.fg_basic_info.get('description')!.value as string,
    //   imageURL: '',
    //   eventID: crypto.randomUUID() as string,
    //   attendance: 0,
    //   date: ,

    // }

    // this.eventService.generateEvent(event, this.image as File)
  }
}
