import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-events-page',
  templateUrl: './search-events-page.component.html',
  styleUrls: ['./search-events-page.component.css'],
  standalone: true,
  imports: [HeaderComponent, NavBarComponent, RouterModule, CommonModule]
})
export class SearchEventsPageComponent{


  constructor() {}

}
