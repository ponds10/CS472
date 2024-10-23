import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // sample service that should get the user information based on authentification from the firebase db
  sampleUser: User = {
    first_name: 'Andrew',
    last_name: 'Hipp',
    accountID: '11223344556677',
    accountType: 'individual',
    email: 'sample@email.com',
    phone: '702-123-4567',
    street: '123 LV BLVD',
    state: 'Nevada',
    city: 'Las Vegas',
    zip: '89103',
    bio: 'Hello! I am a passionate animal lover who often fosters dogs and cats.',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }

  // returns the user!
  get_sample_user()
  {
    return this.sampleUser;
  }
}
