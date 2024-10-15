import { Component } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css'
})
export class PetPageComponent {

}
