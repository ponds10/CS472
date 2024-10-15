import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-sample-card',
  standalone: true,
  imports: [],
  templateUrl: './sample-card.component.html',
  styleUrl: './sample-card.component.css'
})
export class SampleCardComponent {
  @Input()title:string = "";
  @Input()description:string = "";
  @Input()image = ""
}
