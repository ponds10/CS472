import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {

  constructor() { }

  private dog_breeds: string[] = [
    'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Poodle', 'Beagle', 
    'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Dachshund', 'Shih Tzu', 'Siberian Husky', 'Doberman Pinscher', 
    'Great Dane', 'Chihuahua', 'Australian Shepherd', 'Cocker Spaniel', 'Pomeranian', 'Border Collie', 'Shiba Inu', 
    'Bichon Frise', 'Maltese', 'Pit Bull Terrier', 'Jack Russell Terrier', 'Cavalier King Charles Spaniel', 'other'
  ];

  private cat_breeds: string[] = [
    'Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'Sphynx', 'Bengal', 'British Shorthair', 'Scottish Fold', 
    'Abyssinian', 'Birman', 'Russian Blue', 'Savannah', 'Norwegian Forest', 'Oriental', 'American Shorthair', 
    'Devon Rex', 'Cornish Rex', 'Himalayan', 'Turkish Van', 'Burmese', 'Tonkinese', 'Exotic Shorthair', 'Balinese', 
    'Egyptian Mau', 'Ocicat', 'other'
  ]
  get_dog_breeds(): string[] {
    return this.dog_breeds;
  }

  get_cat_breeds(): string[] {
    return this.dog_breeds;
  }
}
