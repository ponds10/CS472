import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  title: string = '';
  description: string = '';
  imageUrl: string = '';
  lat: number = 0;
  lng: number = 0;

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  onSubmit(): void {
    this.dialogRef.close({
      //title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      lat: this.lat,
      lng: this.lng,
    });
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
