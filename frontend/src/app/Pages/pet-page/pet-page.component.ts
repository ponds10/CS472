import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { Pet } from '../../pet.model';
import { CommonModule } from '@angular/common';
import { PetService } from '../../pet.service';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css',
})
export class PetPageComponent implements OnInit {
  pet?: Pet;

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private petService: PetService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.petService.getPetById(id).subscribe({
        next: (data: Pet | undefined) => {
          if (data) {
            this.pet = data;
          } else {
            this.errorMessage = 'Pet not found.';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching pet details:', error);
          this.errorMessage = 'Unable to load pet details. Please try again later.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Invalid pet ID.';
      this.isLoading = false;
    }

  }

  formatPhone(phone: string): string {
    return phone.replace(/[^0-9+]/g, '');
  }
}
