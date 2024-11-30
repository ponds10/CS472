import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for ngif and ngfor
import { ActivatedRoute } from '@angular/router';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { PetCardComponent } from '../../../shared/components/pet-card/pet-card.component';
import { Pet } from '../../../core/models/pet.model';
import { HeaderComponent } from '../../../shared/header/header.component';
import { from } from 'rxjs';
import { PetsService } from '../../../core/services/pets/pets.service';
import { map } from 'rxjs/operators';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [NavBarComponent, CommonModule, PetCardComponent, HeaderComponent],
  templateUrl: './pet-page.component.html',
  styleUrl: './pet-page.component.css',
})
export class PetPageComponent implements OnInit {
  pet: Pet | undefined;

  constructor(private route: ActivatedRoute, private petService: PetsService) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    from(this.petService.getPetById(id))
      .pipe(
        map((data: DocumentData | null) => {
          // Map DocumentData to your Pet interface
          if (data) {
            return {
              uid: data['uid'],
              petId: data['petID'],
              name: data['name'],
              breed: data['breed'],
              species: data['species'],
              sex: data['sex'],
              age: data['age'],
              weight: data['weight'],
              image: data['image'],
              contact: data['contact'],
              vacc: data['vacc'],
              vetHistory: data['vetInfo'],
              miscMed: data['misc'], 
              program: data['program'],
              miscInfo: data['addInfo'],
            } as Pet;
          } else {
            return undefined;
          }
        })
      )
      .subscribe((data: Pet | undefined) => {
        this.pet = data;
      });
  }
}
