import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { Pet } from '../../pet.model';
import { PetService } from '../../depreciated/pet.service'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
  standalone: true,
  imports: [CommonModule, PetCardComponent, FormsModule, RouterModule, HeaderComponent, NavBarComponent] 
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  searchTerm: string = '';
  selectedSpecies: string = '';
  errorMessage: string = '';

  // Pagination properties
  currentPage: number = 1;
  petsPerPage: number = 6;

  constructor(private readonly petService: PetService) { }

  ngOnInit(): void {
    this.petService.getPets().subscribe({
      next: (data: Pet[]) => {
        this.pets = data;
      },
      error: (error) => {
        console.error('Error fetching pets:', error);
        this.errorMessage = 'Unable to load pets. Please try again later.';
      }
    });
  }

  filteredPets(): Pet[] {
    return this.pets.filter(pet => {
      const matchesName = pet.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesSpecies = this.selectedSpecies ? pet.species === this.selectedSpecies : true;
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
