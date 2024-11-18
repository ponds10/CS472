import { Component, ElementRef, inject } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { SampleCardComponent } from '../../../shared/components/sample-card/sample-card.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../../shared/header/header.component";
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Pet } from '../../../core/models/pet.model';
import { PetsService } from '../../../core/services/pets/pets.service';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SearchPanelComponent } from './search-panel/search-panel/search-panel.component';

@Component({
  selector: 'app-search-pets-filter',
  standalone: true,
  imports: [NavBarComponent, 
          MatIconModule, 
          MatChipsModule, 
          MatSliderModule, 
          SampleCardComponent, 
          HeaderComponent,
          ReactiveFormsModule,
          FormsModule,
          SearchPanelComponent,
        ],
  templateUrl: './search-pets-filter.component.html',
  styleUrl: './search-pets-filter.component.css'
})
export class SearchPetsFilterComponent {
  pets: Pet[] = [];
  currentPage: number = 1;
  petsPerPage: number = 6;
  searchTerm: string = '';
  selectedSpecies: string = '';
  errorMessage: string = '';
  petServ = inject(PetsService);
  pets$ = this.petServ.loadPets() as Observable<DocumentData[]>;

  constructor(private viewportscroller: ViewportScroller)
  {}

  ngOnInit(): void {
    this.pets$.subscribe({
      next: (data: DocumentData[]) => {
        this.pets = data.map((pet) => ({
          id: pet['petID'],
          name: pet['name'],
          species: pet['species'],
          breed: pet['breed'],
          sex: pet['sex'],
          age: pet['age'],
          weight: pet['weight'],
          image: pet['image'],
          documents: pet['documents'],
          contact: pet['contact'],
        }));
      },
      error: (error: any) => {
        console.error('Error fetching pets:', error);
        this.errorMessage = 'Unable to load pets. Please try again later.';
      },
    });
  }

  filteredPets(): Pet[] {
    return this.pets.filter((pet) => {
      const matchesName = pet.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchesSpecies = this.selectedSpecies
        ? pet.species === this.selectedSpecies
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
  
}
