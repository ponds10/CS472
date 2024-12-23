import { Component, OnInit } from '@angular/core';
import { Events } from '../../../../core/models/events';
import { Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { EventsService } from '../../../../core/services/event/events.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-eventcard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './eventcard.component.html',
  styleUrl: './eventcard.component.css'
})
export class EventcardComponent implements OnInit{
  constructor(private eventService: EventsService)
  {

  }

  @Input() event: Events | null = null;
  attendedEvents: Events[] | null = null;
  date: Date | null = null;

  ngOnInit(): void {
    const timestamp = this.event?.date as Timestamp
    this.date = timestamp.toDate();
  }

  getMonth()
  {
    switch(this.date?.getMonth())
    {
      case 0: return "Jan"; break;
      case 1: return "Fed"; break;
      case 2: return "Mar"; break;
      case 3: return "Apr"; break;
      case 4: return "May"; break;
      case 5: return "June"; break;
      case 6: return "July"; break;
      case 7: return "Aug"; break;
      case 8: return "Sep"; break;
      case 9: return "Oct"; break;
      case 10: return "Nov"; break;
      case 11: return "Dec"; break;
      default: return; break;
    }
  }

  getDay()
  {
    return this.date?.getDate()
  }

  attendEvent()
  {
    this.eventService.attendEvent(this.event as Events);
    this.attendedEvents?.push(this.event!)
  }

  attendChecker(inputEvent: Events)
  {
    // if(this.eventService.attendedEvents == null)
    // {
    //   this.eventService.getAttendedEvents().subscribe((data: Events[]) => {
    //     //console.log("is this getting called evertime?")
    //     // its not yay
    //     this.attendedEvents = data;
    //   })
    // }
    // else
    // {
    //   this.attendedEvents = this.eventService.attendedEvents;
    // }

    // const finalEvents: Events[] = this.attendedEvents!;
    // for(const event of finalEvents)
    // {
    //   if(event.eventID == inputEvent.eventID)
    //   {
    //     return true;
    //   }
    // }

    return false;
  }
}

