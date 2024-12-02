import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationServiceService } from '../../../core/services/navService/navigation-service.service';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { PetsService } from '../../../core/services/pets/pets.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Pet } from '../../../core/models/pet.model';
import { LoginService } from '../../../core/services/login/login.service';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-pets-page',
  standalone: true,
  imports: [MatIcon, HeaderComponent, NavBarComponent, PetCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './my-pets-page.component.html',
})
export class MyPetsPageComponent implements OnInit {
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
  pets: Pet[] | null = null;
  currentPage: number = 1;
  petsPerPage: number = 8;
  searchTerm: string = '';
  selectedSpecies: string = '';
  errorMessage: string = '';

  constructor(
    private viewportscroller: ViewportScroller,
    private readonly petService: PetsService,
    public navService: NavigationServiceService,
    private loginService: LoginService
  ) { }

  //
  ngOnInit(): void {
    this.petService.loadPets().subscribe((data: Pet[]) => {
      this.pets = data;
    })
    let pet: Pet = {
      uid: this.loginService.auth.currentUser?.uid as string,
      petId: '',
    name: '',
    species: '',
    breed: '',
    sex: '',
    age: undefined,
    program: '',
    bio: '',
    }
    this.searchPets(pet)
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
        (!this.filterResults.uid || pet.uid === this.filterResults.uid) &&
        (!this.filterResults.species ||
          pet.species === this.filterResults.species) &&
        // @ts-ignore
        (!this.filterResults.age || this.filterResults.age.includes(pet.age)) &&
        (!this.filterResults.breed || pet.breed === this.filterResults.breed) &&
        (!this.filterResults.sex || pet.sex === this.filterResults.sex) &&
        (!this.filterResults.program ||
          pet.program === this.filterResults.program)
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
