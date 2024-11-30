import { Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  currentMonth: number = 0;
  currentYear: number = 0;
  startDay: number = 0;
  daysInMonth: number = 0;
  days: [number, boolean][] = []
  bools: boolean[] = []
  currentMonthName: string = ""

  @Output() monthEmitter: EventEmitter<number> = new EventEmitter();
  @Output() dayEmitter: EventEmitter<string>  = new EventEmitter();
  @Output() yearEmitter: EventEmitter<string>  = new EventEmitter();
  constructor()
  {

  }

  ngOnInit(): void {
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
    for(let i = 0; i <= this.startDay; i++)
    {
      this.days.push([0, false]);
    }

    for(let i = 0; i <= this.daysInMonth; i++)
    {
      this.days.push([i+1, false]);
    }

    this.currentMonthName = this.getMonthString(this.currentMonth)
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
    console.log(this.startDay);
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
  }

  selectDay(idx: number)
  {
    this.days.forEach((day) => {
      day[1] = false;
    })
    this.days[idx][1] = !this.days[idx][1]

    // console.log(this.currentMonthName)
    // console.log(this.currentYear.toString())
    // console.log(this.days[idx][0].toString())

    this.monthEmitter.emit(this.currentMonth+1);
    this.dayEmitter.emit(this.days[idx][0].toString());
    this.yearEmitter.emit(this.currentYear.toString());
  }


}
