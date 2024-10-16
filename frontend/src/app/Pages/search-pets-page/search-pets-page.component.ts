import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { SampleCardComponent } from '../../../shared/components/sample-card/sample-card.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-pets-page',
  standalone: true,
  imports: [NavBarComponent, MatChipsModule, MatSliderModule, MatIcon, SampleCardComponent],
  templateUrl: './search-pets-page.component.html',
  styleUrl: './search-pets-page.component.css'
})
export class SearchPetsPageComponent {
  constructor(private router: Router){}

  navigateToPetPage()
  {
    this.router.navigate(['/petpage'], {queryParams: null})
  }

}
