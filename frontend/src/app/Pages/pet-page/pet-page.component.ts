import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for ngif and ngfor
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { Pet } from '../../../core/models/pet.model';
import { HeaderComponent } from '../../../shared/header/header.component';
import { PetsService } from '../../../core/services/pets/pets.service';


@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, PetCardComponent, HeaderComponent],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css',
})
export class PetPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private petService: PetsService) {}
  pet: Pet | null = null;

  ngOnInit(): void {
    this.pet = this.petService.selectedPet;
  }
}
