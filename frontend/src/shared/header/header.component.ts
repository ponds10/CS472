import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavigationServiceService } from '../../core/services/navService/navigation-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navService = inject(NavigationServiceService)
}
