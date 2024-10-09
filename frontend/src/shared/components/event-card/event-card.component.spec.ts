import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input()image:string = "";
  @Input()title:string = "";
  @Input()date:string = "";
  @Input()registeredCount:number = 0;
}
