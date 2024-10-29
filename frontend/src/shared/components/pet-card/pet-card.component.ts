import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../../../app/pet.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css'],
})
export class PetCardComponent {
  @Input() pet!: Pet;

  formatPhone(phone: string | undefined): string {
    return phone ? phone.replace(/[^0-9+]/g, '') : '';
  }
}
