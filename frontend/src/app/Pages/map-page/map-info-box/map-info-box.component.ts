import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-map-info-box',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './map-info-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapInfoBoxComponent {
  constructor(public dialogRef: MatDialogRef<MapInfoBoxComponent>) {}

  closeDialog(): void {
    this.dialogRef.close('hi');
  }
}
