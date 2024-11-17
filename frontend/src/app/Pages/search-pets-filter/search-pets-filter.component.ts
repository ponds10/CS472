import { Component, ElementRef } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { SampleCardComponent } from '../../../shared/components/sample-card/sample-card.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../../shared/header/header.component";
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-pets-filter',
  standalone: true,
  imports: [NavBarComponent, 
          MatIconModule, 
          MatChipsModule, 
          MatSliderModule, 
          SampleCardComponent, 
          HeaderComponent,
          ReactiveFormsModule,],
  templateUrl: './search-pets-filter.component.html',
  styleUrl: './search-pets-filter.component.css'
})
export class SearchPetsFilterComponent {

  constructor(private viewportscroller: ViewportScroller)
  {}


  
}
