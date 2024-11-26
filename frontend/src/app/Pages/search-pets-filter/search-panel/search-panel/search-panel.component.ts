import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PetsService } from '../../../../../core/services/pets/pets.service';
import { Pet } from '../../../../../core/models/pet.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [FormsModule, CommonModule,MatIcon ],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.css'
})
export class SearchPanelComponent {

  filterResults: Pet | null | undefined = null;
  ages: string[] = [];

  animalTypes: string[] = [];
  animalGenders: string[] = [];
  animalSizes: string[] = [];
  animalPrograms: string[] = [];
  Breeds: string[] = [];
  
  selectedType: string = "";
  selectedAge: number | undefined = undefined;
  searchTerm: string = '';
  selectedGender: string = '';
  selectedSize: string = '';
  selectedProgram: string = '';
  selectedBreed: string = '';

  constructor(private petService: PetsService) { 
    this.ages = this.petService.ages;
    this.animalTypes = this.petService.animalTypes;
    this.animalGenders = this.petService.animalGenders;
    this.animalSizes = this.petService.animalSizes;
    this.animalPrograms = this.petService.animalPrograms;
  }

  // output decorator that creates a communication path from child (this component)
  // to parent (search-pets-filter component)
  @Output() petsChange = new EventEmitter<Pet>();
 
  
  // generate events that can be listened by the parent component triggered by emit method

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


  // changes the breed types based on the selected species (cat or dog)
  selectAnimal(animal: 'Cat' | 'Dog') {
    this.selectedType = animal;
    console.log('Selected Type:', this.selectedType); // Debugging line

    if (animal === 'Cat') {
      this.Breeds = this.petService.catBreeds;
    } else if (animal === 'Dog') {
      this.Breeds = this.petService.dogBreeds;
    }
  }
  
}
