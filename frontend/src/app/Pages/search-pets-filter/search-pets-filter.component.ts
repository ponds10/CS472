import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { SampleCardComponent } from '../../../shared/components/sample-card/sample-card.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../../shared/header/header.component";

@Component({
  selector: 'app-search-pets-filter',
  standalone: true,
  imports: [NavBarComponent, MatIconModule, MatChipsModule, MatSliderModule, SampleCardComponent, HeaderComponent],
  templateUrl: './search-pets-filter.component.html',
  styleUrl: './search-pets-filter.component.css'
})
export class SearchPetsFilterComponent {

  dog_flag:boolean = true;
  cat_flag:boolean = false;

  dog_breeds: string[] = ["dogbreeds", "Breed1", "Breed2", "Breed3", "Breed4", "Breed5", "Breed6", "Breed7", "Breed8"];
  cat_breeds: string[] = ["catbreeds", "Breed1", "Breed2", "Breed3", "Breed4", "Breed5", "Breed6", "Breed7", "Breed8"];
}
