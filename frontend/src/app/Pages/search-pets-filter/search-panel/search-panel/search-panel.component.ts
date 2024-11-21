import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../../../../../core/services/pets/pets.service';
import { Pet } from '../../../../../core/models/pet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [FormsModule, CommonModule, ],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.css'
})
export class SearchPanelComponent {
  //petService = inject(PetsService);
  pets: Pet[] = []; // Array to store fetched pets
  filteredPets: Pet[] = []; // Array to store filtered pets
  catAges: string[] = [];
  dogAges: string[] = [];
  animalTypes: string[] = [];
  animalGenders: string[] = [];
  animalSizes: string[] = [];
  animalPrograms: string[] = [];
  Breeds: string[] = [];
  
  selectedType: string = "";
  selectedAge: number = 0;
  searchTerm: string = '';
  selectedGender: string = '';
  selectedSize: string = '';
  selectedProgram: string = '';
  selectedBreed: string = '';

  constructor(private petService: PetsService) { 
    this.catAges = this.petService.catAges;
    this.dogAges = this.petService.dogAges;
    this.animalTypes = this.petService.animalTypes;
    this.animalGenders = this.petService.animalGenders;
    this.animalSizes = this.petService.animalSizes;
    this.animalPrograms = this.petService.animalPrograms;
  }
  
  animalTypeChange( type: string): void {
    if (type === 'Cat') {
      this.Breeds = this.petService.catBreeds;
    } else if (type === 'Dog') {
      this.Breeds = this.petService.dogBreeds;
    } else if (type === 'Any') {
      this.Breeds = this.petService.catBreeds.concat(this.petService.dogBreeds);
    }
  }
  
  


  // filterPets() {
  //   this.filteredPets = this.pets.filter(pet => {
  //     // Check if the pet matches all selected filters
  //     return (
  //       (!this.selectedAge || pet.age === this.selectedAge) &&
  //     (!this.selectedType || pet.type === this.selectedType) &&
  //     );
  //   });
  // }

}
