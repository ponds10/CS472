import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for ngif and ngfor
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { Pet } from '../../../core/models/pet.model';
import { HeaderComponent } from '../../../shared/header/header.component';


@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, HeaderComponent],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css',
})
export class PetPageComponent implements OnInit {
  constructor() {}

  pet: Pet | null = null;

  ngOnInit(): void {
    this.pet = JSON.parse(sessionStorage.getItem('selectedPet') as string);
  }

}
