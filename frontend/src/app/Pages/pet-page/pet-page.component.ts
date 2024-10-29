import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for ngif and ngfor
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { Pet } from '../../pet.model';
import { HeaderComponent } from '../../../shared/header/header.component';

import { PetService } from '../../pet.service';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, PetCardComponent, HeaderComponent],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css',
})

export class PetPageComponent implements OnInit {
  pet: Pet | undefined;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(id).subscribe((data: Pet | undefined) => {
      this.pet = data;
    });
  }
}