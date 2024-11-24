import { Component, ElementRef, inject } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { SampleCardComponent } from '../../../shared/components/sample-card/sample-card.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../../../shared/header/header.component";
import { ReactiveFormsModule, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { ViewportScroller, CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Pet } from '../../../core/models/pet.model';
import { PetsService } from '../../../core/services/pets/pets.service';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
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
          CommonModule,
          PetCardComponent,
        
        ],
  templateUrl: './search-pets-filter.component.html',
  styleUrl: './search-pets-filter.component.css'
})
export class SearchPetsFilterComponent {
  pets: Pet[] = [];
  filterResults: Pet = {
    id: '',
    name: '',
    species: '',
    breed: '',
    sex: '',
    age: 0,
    program: '',
  };
  currentPage: number = 1;
  petsPerPage: number = 6;
  searchTerm: string = '';
  selectedSpecies: string = '';
  errorMessage: string = '';
  petServ = inject(PetsService);
  pets$ = this.petServ.loadPets() as Observable<DocumentData[]>;

  constructor(private viewportscroller: ViewportScroller, private readonly petService: PetsService)
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
          program: pet['program'],
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

  public searchPets(petfilterResults: Pet): void  {
    // get the filter options from child component
    this.filterResults = petfilterResults;
    
  }
  

  filteredPets(): Pet[] {
    // return an array of filtered pets 
    return this.pets.filter((pet) => {
      console.log("hello");
      console.log(this.filterResults.species);

       //returns a boolean indicating whether the results exists
       return (
        (!this.filterResults.species || pet.species === this.filterResults.species) &&
              (!this.filterResults.age || pet.age === this.filterResults.age) &&
            (!this.filterResults.breed || pet.breed === this.filterResults.breed) &&
            (!this.filterResults.sex || pet.sex === this.filterResults.sex) &&
            (!this.filterResults.program || pet.program === this.filterResults.program)
       )
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
