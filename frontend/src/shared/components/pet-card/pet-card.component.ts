import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../../../app/pet.model';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css'],
})
export class PetCardComponent {
  @Input() pet!: Pet;

  // Utility method to format phone numbers
  formatPhone(phone: string): string {
    return phone.replace(/[^0-9+]/g, '');
  }
}
