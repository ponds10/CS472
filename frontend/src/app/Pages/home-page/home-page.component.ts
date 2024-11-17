import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HomeCardComponent } from '../../../shared/components/home-card/home-card.component';
import { HeaderComponent } from "../../../shared/header/header.component";
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../core/models/user';
import { from } from 'rxjs';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent, HomeCardComponent, HeaderComponent, EventsCalendarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  user: User | null = null;
  constructor(private userService: UserService)
  {
  }

  
  ngOnInit(): void {
    this.user = this.userService.currentUser;
    if(this.user == null)
    {
      // use the from() from rxjs to transform the promise into an observable
      // than subscribe to it
      from(this.userService.getUserInfo()).subscribe((data) => 
      {
        this.user = this.userService.currentUser;
      })
      
    }
  }
}
