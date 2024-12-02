import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { SampleCardComponent } from '../../../shared/components/sample-card/sample-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../shared/header/header.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { ViewportScroller, CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Pet } from '../../../core/models/pet.model';
import { PetsService } from '../../../core/services/pets/pets.service';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SearchPanelComponent } from './search-panel/search-panel/search-panel.component';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
@Component({
  selector: 'app-search-pets-filter',
  standalone: true,
  imports: [
    NavBarComponent,
    MatIconModule,
    MatChipsModule,
    MatSliderModule,
    SampleCardComponent,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    SearchPanelComponent,
    CommonModule,
    PetCardComponent,
    
  ],
  templateUrl: './search-pets-filter.component.html',
  styleUrl: './search-pets-filter.component.css',
})
export class SearchPetsFilterComponent implements OnInit {
  pets: Pet[] | null = null;
  filterResults: Pet = {
    uid: '',
    petId: '',
    name: '',
    species: '',
    breed: '',
    sex: '',
    age: undefined,
    program: '',
    bio: '',
  };
  currentPage: number = 1;
  petsPerPage: number = 6;
  searchTerm: string = '';
  selectedSpecies: string = '';
  errorMessage: string = '';
  validPrograms: string[] = ['Shelter', 'Foster']

  constructor(
    private viewportscroller: ViewportScroller,
    private readonly petService: PetsService,
    private navService: NavigationServiceService,
  ) {}

  //
  ngOnInit(): void {
    this.petService.loadPets().subscribe((data: Pet[]) => {
      this.pets = data;
    })
  }

  searchPets(petfilterResults: Pet): void {
    // get the filter options from child component
    this.filterResults = petfilterResults;
  }

  filteredPets(): Pet[] {
    // return an array of filtered pets
    return (this.pets ?? []).filter((pet) => {
      //returns a boolean indicating whether the results exists
      return (

        (!this.filterResults.species ||
          pet.species === this.filterResults.species) &&
        // @ts-ignore
        (!this.filterResults.age || this.filterResults.age.includes(pet.age)) &&
        (!this.filterResults.breed || pet.breed === this.filterResults.breed) &&
        (!this.filterResults.sex || pet.sex === this.filterResults.sex) &&
        (!this.filterResults.program ||
          pet.program === this.filterResults.program) &&
        (this.validPrograms.includes(pet.program))
      );
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPets().length / this.petsPerPage);
  }

  paginatedPets(): Pet[] {
    const start = (this.currentPage - 1) * this.petsPerPage;
    return this.filteredPets().slice(start, start + this.petsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  selectPet(pet: Pet) {
    this.petService.selectedPet = pet;
    // save pet data locally
    sessionStorage.setItem('selectedPet', JSON.stringify(pet));
    this.navService.navigateToPetPage(pet);
    
  }
}
