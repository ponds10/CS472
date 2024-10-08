import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-pets-page',
  standalone: true,
  imports: [NavBarComponent, MatChipsModule, MatSliderModule, MatIcon],
  templateUrl: './search-pets-page.component.html',
  styleUrl: './search-pets-page.component.css'
})
export class SearchPetsPageComponent {

}
