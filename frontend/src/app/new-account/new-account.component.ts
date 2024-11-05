import { Component } from '@angular/core';
import { NavigationServiceService } from '../../core/services/navService/navigation-service.service';
@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent {
  constructor(public navService:NavigationServiceService)
  {}
}
