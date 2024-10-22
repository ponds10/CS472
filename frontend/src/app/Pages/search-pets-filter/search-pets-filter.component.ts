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
          ReactiveFormsModule],
  templateUrl: './search-pets-filter.component.html',
  styleUrl: './search-pets-filter.component.css'
})
export class SearchPetsFilterComponent {

  constructor(private viewportscroller: ViewportScroller)
  {}

  @ViewChild('target') scroll_element!: ElementRef;

  species_fg = new FormGroup({
    dog: new FormControl(''),
    cat: new FormControl(''),
  });

  pet_details_fg = new FormGroup({
    age: new FormControl(''),
    weight: new FormControl(''),
    gender: new FormControl(''),
    breed: new FormControl('')
  });

  // variables
  progress:number = 1;
  step1:number = 1;
  step2:number = 0;
  step3:number = 0;

  next()
  {
    if(this.step1 == 1)
    {
      this.step1 = 0;
      this.step2 = 1;
      this.progress = 33;

    }
    else if(this.step2 == 1)
    {
      this.step2 = 0;
      this.step3 = 1;
      this.progress = 66;
    }
    else if(this.step3 == 1)
    {

    }
  }

  back()
  {
    if(this.step3 == 1)
    {
      this.step2 = 1;
      this.step3 = 0;
      this.progress = 33;

    }
    else if(this.step2 == 1)
    {
      this.step1 = 1;
      this.step2 = 0;
      this.progress = 1;
    }
  }
  
  selectSpecies(species:string)
  {
    if(species == "cat"){
      this.cat_flag = !this.cat_flag;
    }
    else if(species == "dog")
    {
      this.dog_flag = !this.dog_flag;
    }
  
  }

  
  dog_flag:boolean = false;
  cat_flag:boolean = false;

  dog_breeds: string[] = ["dogbreeds", "Breed1", "Breed2", "Breed3", "Breed4", "Breed5", "Breed6", "Breed7", "Breed8"];
  cat_breeds: string[] = ["catbreeds", "Breed1", "Breed2", "Breed3", "Breed4", "Breed5", "Breed6", "Breed7", "Breed8"];


  test()
  {
    window.scrollBy({
      behavior: 'smooth',
      top: 10000
    })

    this.viewportscroller.scrollToAnchor('target');

    console.log('scrolling')
  }
}
