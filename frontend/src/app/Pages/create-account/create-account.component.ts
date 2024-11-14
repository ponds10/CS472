import { Component } from '@angular/core';
import { CreateBoxComponent } from './create-box/create-box.component';
@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CreateBoxComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

}
