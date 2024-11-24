import { Component, inject, Output, EventEmitter } from '@angular/core';
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
  filterResults: Pet = {
    id: '',
    name: '',
    species: '',
    breed: '',
    sex: '',
    age: 0,
    program: '',
    size: '',
  };
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

  // output an array of the filters
  // contemplating if i should do that
  @Output() petsChange = new EventEmitter<Pet>();
 
  

  onSubmit(): void {
    this.filterResults = {
      id: '',
      name: '',
      species: this.selectedType,
      breed: this.selectedBreed,
      sex: this.selectedGender,
      program: this.selectedProgram,
      size: this.selectedSize,
      age: this.selectedAge,
    }
    this.petsChange.emit(this.filterResults);
  }

  selectAnimal(animal: 'cat' | 'dog') {
    this.selectedType = animal;
    if (animal === 'cat') {
      this.Breeds = this.petService.catBreeds;
    } else if (animal === 'dog') {
      this.Breeds = this.petService.dogBreeds;
    }
  }
  


}
