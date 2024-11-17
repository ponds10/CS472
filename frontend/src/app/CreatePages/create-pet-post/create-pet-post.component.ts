import { Component, OnInit, inject } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '@angular/fire/auth';
import { Events } from '../../../core/models/events';
import { EventsService } from '../../../core/services/event/events.service';
import { ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
@Component({
  selector: 'app-create-pet-post',
  standalone: true,
  imports: [NavBarComponent, 
           HeaderComponent, 
           ReactiveFormsModule, 
           MatIconModule],
  templateUrl: './create-pet-post.component.html',
  styleUrl: './create-pet-post.component.css'
})
export class CreatePetPostComponent implements OnInit{
   // vars
   selectedImage: File | null = null; 
   userId: string | undefined = ''; 
   auth: Auth = inject(Auth);
 
   // this is for images
   image: File | null = null;
   url: string | null | ArrayBuffer = "./assets/images/event-page-sample-1.jpg";
 
 
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
 
 
 
}
