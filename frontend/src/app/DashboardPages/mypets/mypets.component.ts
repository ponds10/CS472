import { Component } from '@angular/core';
import { NavBarComponent } from "../../../shared/nav-bar/nav-bar.component";
import { HeaderComponent } from '../../../shared/header/header.component';
@Component({
  selector: 'app-mypets',
  standalone: true,
  imports: [NavBarComponent, HeaderComponent],
  templateUrl: './mypets.component.html',
  styleUrl: './mypets.component.css'
})
export class MypetsComponent {

}
