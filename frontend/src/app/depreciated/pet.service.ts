// src/app/pet.service.ts
import { Injectable } from '@angular/core';
import { Pet } from '../pet.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private readonly pets: Pet[] = [
    {
      id: 1,
      name: 'Milo',
      species: 'Cat',
      breed: 'Orange Tabby',
      sex: 'Male',
      age: '2 years',
      weight: '10 lbs',
      image: 'https://th.bing.com/th/id/OIP.MIeBAl6gLa4vclmGbysFvgHaHa?rs=1&pid=ImgDetMain',
      documents: [
        { key: 'Vaccination', value: 'vaccination.pdf' },
        { key: 'Vet Visits', value: 'vet_visits.pdf' }
      ],
      contact: {
        organization: { name: 'Nevada Humane Society', url: 'https://www.nevadahumanesociety.org/' },
        email: 'adopt@petcenter.org',
        phone: '(555) 123-4567'
      }
    },
    {
      id: 2,
      name: 'Bella',
      species: 'Dog',
      breed: 'Golden Retriever',
      sex: 'Female',
      weight: '20 lbs',
      image: 'https://th.bing.com/th/id/OIP.Jf0NnGpH2AhNM3BtwZufwwHaJ4?rs=1&pid=ImgDetMain',
      documents: [
        { key: 'Vaccination', value: 'vaccination_bella.pdf' }
        // No vet visits for Bella
      ],
      contact: {
        organization: { name: 'Nevada Humane Society', url: 'https://www.nevadahumanesociety.org/' },
        email: 'adopt@petcenter.org',
        phone: '(555) 123-4567'
      }
    }
    // Add more pets 
  ];

  constructor() { }

  // Method to retrieve all pets
  getPets(): Observable<Pet[]> {
    return of(this.pets);
  }

  // Method to retrieve a pet by ID
  getPetById(id: number): Observable<Pet | undefined> {
    const pet = this.pets.find(p => p.id === id);
    return of(pet);
  }
}

