import { AfterViewInit, ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { EventsService } from '../../../../core/services/event/events.service';
import { Events } from '../../../../core/models/events';
import { EventsAttendance } from '../../../../core/models/events';
import { Timestamp } from '@angular/fire/firestore';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-events-calendar',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './events-calendar.component.html',
  styleUrl: './events-calendar.component.css',
})
export class EventsCalendarComponent implements OnInit{
  currentMonth: number = 0;
  currentYear: number = 0;
  startDay: number = 0;
  daysInMonth: number = 0;
  days: [number, boolean][] = []
  bools: boolean[] = []
  currentMonthName: string = ""


  constructor(public eventService: EventsService)
  {

  }

  async ngOnInit() {
    this.eventService.getAttendedEvents().subscribe((result: Events[]) => {
      console.log(result)
      this.eventService.attendedEvents = result;
      this.selectDays()
    })
    await this.calendarSetUp();
  }

  async calendarSetUp()
  {
    // Get the current date
    const today = new Date();

    // Set current month and year
    this.currentMonth = today.getMonth();  // 0-based index (0 = January, 1 = February, etc.)
    this.currentYear = today.getFullYear();

    // Get the first day of the current month
    const startOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    this.startDay = startOfMonth.getDay();  // 0 = Sunday, 1 = Monday, etc.

    // Get the number of days in the current month
    this.daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);

    // set the days list
    for(let i = 0; i < this.startDay; i++)
    {
      this.days.push([0, false]);
    }

    for(let i = 0; i < this.daysInMonth; i++)
    {
      this.days.push([i+1, false]);
    }

    this.currentMonthName = this.getMonthString(this.currentMonth)

    this.selectDays();
  }

  getMonthString(month:number)
  {
    switch(month)
    {
      case 0: return "January"; break;
      case 1: return "Febuary"; break;
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
      default: return ""; break;
    }
  }

  // Helper function to get the number of days in a month
  getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  nextMonth()
  {
    this.currentMonth += 1;
    if(this.currentMonth == 12)
    {
      this.currentMonth = 0;
      this.currentYear +=1;
    }

    this.updateCalendar()
  }

  prevMonth()
  {
    this.currentMonth -= 1;
    if(this.currentMonth == -1)
    {
      this.currentMonth = 11;
      this.currentYear -=1;
    }

    this.updateCalendar()
  }

  updateCalendar()
  {
    this.days = [];
    // Get the first day of the current month
    const startOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    this.startDay = startOfMonth.getDay();  // 0 = Sunday, 1 = Monday, etc.

    // Get the number of days in the current month
    this.daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);

    // set the days list
    for(let i = 0; i <this.startDay; i++)
    {
      this.days.push([0, false]);
    }

    for(let i = 0; i < this.daysInMonth; i++)
    {
      this.days.push([i+1, false]);
    }

    this.currentMonthName = this.getMonthString(this.currentMonth)
    this.selectDays()
  }

  selectDays()
  {
    if(this.eventService.attendedEvents == null)
    {
      return false;
    }
    let chunk_days = [];
    for(const event of this.eventService.attendedEvents!)
    {
      const timestamp = event.date as Timestamp;
      const date = timestamp.toDate();
      if(date.getMonth() == this.currentMonth)
      {
        this.days[date.getDate() + this.startDay-1][1] = true;
      }
    }

    return true;
  }

  timestampHelper(input:Timestamp | Date)
  {
    const timestamp = input as Timestamp;
    return timestamp.toDate()
  }
}
