import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-map-info-box',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './map-info-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapInfoBoxComponent { }
