import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { Pet } from '../../../core/models/pet.model';
import { PetsService } from '../../../core/services/pets/pets.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    PetCardComponent,
    FormsModule,
    RouterModule,
    HeaderComponent,
    NavBarComponent,
  ],
})
export class PetListComponent {
  pets: Pet[] = [];
  searchTerm: string = '';
  selectedSpecies: string = '';
  errorMessage: string = '';

  // Pagination properties
  currentPage: number = 1;
  petsPerPage: number = 6;

  petServ = inject(PetsService);
  pets$ = this.petServ.loadPets() as Observable<DocumentData[]>;

  constructor(private readonly petService: PetsService) {}

  ngOnInit(): void {
    // this.pets$.subscribe({
    //   next: (data: DocumentData[]) => {
    //     this.pets = data.map((pet) => ({
    //       id: pet['petID'],
    //       name: pet['name'],
    //       species: pet['species'],
    //       breed: pet['breed'],
    //       sex: pet['sex'],
    //       age: pet['age'],
    //       program: pet['program'],
    //       weight: pet['weight'],
    //       image: pet['image'],
    //       documents: pet['documents'],
    //       contact: pet['contact'],
    //     }));
    //   },
    //   error: (error: any) => {
    //     console.error('Error fetching pets:', error);
    //     this.errorMessage = 'Unable to load pets. Please try again later.';
    //   },
    // });
  }

  filteredPets(): Pet[] {
    return this.pets.filter((pet) => {
      const matchesName = pet.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesSpecies = this.selectedSpecies.toLowerCase()
        ? pet.species === this.selectedSpecies.toLowerCase()
        : true;
      return matchesName && matchesSpecies;
      
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

  // filterPets() {
  //   this.filteredPets = this.pets.filter(pet => {
  //     // Check if the pet matches all selected filters
  //     return (
  //       (!this.selectedAge || pet.age === this.selectedAge) &&
  //     (!this.selectedType || pet.species === this.selectedType) &&
  //     (!this.selectedBreed || pet.breed === this.selectedBreed) &&
  //     (!this.selectedGender || pet.sex === this.selectedGender) &&
  //     (!this.selectedSize || pet.weight === this.selectedSize) &&
  //     (!this.selectedProgram || pet.program === this.selectedProgram)

  //     );
  //   });
  // }

  // filterResults: Pet = {
  //   id: '',
  //   name: '',
  //   species: this.selectedType,
  //   breed: this.selectedBreed,
  //   sex: this.selectedGender,
  //   program: this.selectedProgram,
  //   size: this.selectedSize,
  //   age: this.selectedAge,
  // }
}
