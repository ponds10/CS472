import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BreedsService } from '../../../core/services/breeds.service';
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [NavBarComponent, 
            HeaderComponent,
            ReactiveFormsModule,
            MatProgressBarModule,
            MatInputModule,
            MatIconModule
            ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent implements OnInit{
  dog_breeds: string[] = [];
  cat_breeds: string[] = [];

  constructor(private BreedService: BreedsService)
  {}

  ngOnInit(): void {
    this.dog_breeds = this.BreedService.get_dog_breeds();
    this.cat_breeds = this.BreedService.get_cat_breeds();
  }

  // make the form controls for each step in the creation page
  basic_info_fg = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
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
}
