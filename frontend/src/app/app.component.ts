import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PetListComponent } from './Pages/pet-list/pet-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, PetListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Toebeans';
}
