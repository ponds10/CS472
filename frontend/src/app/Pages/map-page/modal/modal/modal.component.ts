import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MapService } from '../../../../../core/services/map/map.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  mapService = inject(MapService);
  description: string = '';
  lat: number = 0;
  lng: number = 0;

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  onSubmit(): void {
    this.mapService.saveMarker(this.lat, this.lng, this.description);

    this.dialogRef.close({
      
    });
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
