import { Component, OnInit, inject } from '@angular/core';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '@angular/fire/auth';
import { ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { PetsService } from '../../../core/services/pets/pets.service';
import { Pet } from '../../../core/models/pet.model';
@Component({
  selector: 'app-create-pet-post',
  standalone: true,
  imports: [NavBarComponent, 
           HeaderComponent, 
           ReactiveFormsModule, 
           MatIconModule],
  templateUrl: './create-pet-post.component.html',
  styleUrl: './create-pet-post.component.css'
})
export class CreatePetPostComponent implements OnInit{
   // vars
   selectedImage: File | null = null; 
   userId: string | undefined = ''; 
   auth: Auth = inject(Auth);
 
   // this is for images
   image: File | null = null;
   url: string | null | ArrayBuffer = "./assets/images/event-page-sample-1.jpg";
   animalTypes: string[];
   dogBreeds: string[];
   catBreeds: string[];
   animalGenders: string[];
   animalSizes: string[];
   animalPrograms: string[] = [
    'Shelter',
    'Foster',
    'Personal'
  ]
 
 
   constructor(private petService: PetsService){
    this.animalTypes = petService.animalTypes
    this.dogBreeds = petService.dogBreeds
    this.catBreeds = petService.catBreeds
    this.animalGenders = petService.animalGenders
    this.animalSizes = petService.animalSizes
    //this.animalPrograms = petService.animalPrograms
   }
 
   // oninit 
   ngOnInit(): void {
     this.userId = this.auth.currentUser?.uid;
   }
 
   // make the form controls for each step in the creation page
   fg_pet = new FormGroup({
 
     name: new FormControl(''),
     bio: new FormControl(''),

     vaccination: new FormControl(''),
     vetinary: new FormControl(''),
     medical: new FormControl(''),
 
     species: new FormControl(''),
     breed: new FormControl(''),
     age: new FormControl(''),
     gender: new FormControl(''),
     weight: new FormControl(''),
     size: new FormControl(''),
     program: new FormControl(''),
 
     misc: new FormControl(''),
   });
 
   // filechange event
   fileChangeEvent(event: any): void {
     const file = event.target.files[0];
     if (file) {
       this.selectedImage = file;
     }
 
     this.image = file;
     const imagePath = file;
 
     const reader = new FileReader();
 
     reader.readAsDataURL(file);
     reader.onload = (e => {
       this.url = reader.result;
     })
   }
 
   createPet() {
      let age = parseInt(this.fg_pet.get('age')?.value as string)
      const pet: Pet = {
      name: this.fg_pet.get('name')?.value as string,
      bio: this.fg_pet.get('bio')?.value as string,
      species: this.fg_pet.get('species')?.value as string,
      breed: this.fg_pet.get('breed')?.value as string,
      age: age,
      sex: this.fg_pet.get('gender')?.value as string,
      weight: this.fg_pet.get('weight')?.value as string,
      size: this.fg_pet.get('size')?.value as string,
      program: this.fg_pet.get('program')?.value as string,

      vacc: this.fg_pet.get('vaccination')?.value as string,
      vetHistory: this.fg_pet.get('vetinary')?.value as string,
      miscMed: this.fg_pet.get('medical')?.value as string,

      miscInfo: this.fg_pet.get('misc')?.value as string,

      uid: this.auth.currentUser?.uid as string,
      petId: ''
    }
    this.petService.generatePet(pet, this.selectedImage as File)
    
   }
 
}
