import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Used to create new observables (event)
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Mock list of events
  private events: Event[] = [
    {
      id: '1',
      title: 'Pet Adoption Fair',
      date: 'November 20, 2024',
      location: 'Desert Breeze Park, 8275 West Spring Mountain Rd., Las Vegas, NV 89117',
      time: '10:00 A.M.',
      imageUrl: './assets/images/event-page-sample-1.jpg',
      registeredCount: 120,
      isRegistered: true,
      description: 'Do you want to meet your new family member? Join us for a day of pet adoptions! Meet our lovely dogs, cats, and other pets.'
    },
    {
      id: '2',
      title: 'Pet Training Workshop',
      date: 'December 25, 2024',
      location: 'The Animal Foundation, 655 N Mojave Rd., Las Vegas, NV 89101',
      time: '2:00 P.M.',
      imageUrl: './assets/images/event-page-sample-2.jpg',
      registeredCount: 80,
      isRegistered: false,
      description: 'Join us for a workshop for pet owners to learn effective training techniques for their pets.'
    },
    {
      id: '3',
      title: 'Pet Care Program',
      date: 'January 8, 2025',
      location: 'City of Las Vegas Animal Care Center, 1700 N Grand Ave., Las Vegas, NM 87701',
      time: '09:00 A.M.',
      imageUrl: './assets/images/event-page-sample-3.jpg',
      registeredCount: 150,
      isRegistered: true,
      description: 'You want to provide best care to your pet? Then reegister to learn best practices for pet care program from our experts!'
    }
  ];

  // Method to get all pet events
  getEvents(): Observable<Event[]> {
    return of(this.events); // Return the mock events as an observable
  }

  // Method to get a pet event by ID
  getEventById(id: string): Observable<Event> {
    const event = this.events.find(event => event.id === id);
    return of(event!); // Return the found event, assume non-null for simplicity
  }
}
