import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../../pet.model';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { PetService } from '../../pet.service';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, PetCardComponent, HeaderComponent, NavBarComponent],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.petService.getPets().subscribe({
      next: (data: Pet[]) => {
        this.pets = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching pets:', error);
        this.errorMessage = 'Unable to load pets. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
