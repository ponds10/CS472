import { Component, OnInit } from '@angular/core';
import { Events } from '../../../../core/models/events';
import { Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
@Component({
  selector: 'app-eventcard',
  standalone: true,
  imports: [],
  templateUrl: './eventcard.component.html',
  styleUrl: './eventcard.component.css'
})
export class EventcardComponent implements OnInit{
  @Input() event: Events | null = null;
  
  
  ngOnInit(): void {
    const timestamp = this.event?.date as Timestamp
    this.event!.date = timestamp.toDate();
  }
}
