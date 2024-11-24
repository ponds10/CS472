import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [NavBarComponent, MatChipsModule, MatSliderModule, MatIcon, HeaderComponent],
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.css'
})
export class DocumentsPageComponent {

}
