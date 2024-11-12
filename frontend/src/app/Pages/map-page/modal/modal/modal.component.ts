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
  //user$ = this.mapService.user$;
  description: string = '';
  slat: string = '';
  slng: string = '';
  lat: number = 0;
  lng: number = 0;

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  onSubmit(): void {
    this.lat = 1;
    this.lng = 2;

    if (this.lat && this.lng && this.description) {
      this.mapService.saveMarker(this.lat, this.lng, this.description)
        .then(() => {
          console.log('Marker saved successfully');
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error saving marker:', error);
          alert('Failed to save marker. Please try again.');
        });
    } else {
      alert('Please fill out all required fields.');
    }
  }

  getpostion(inputElement: HTMLInputElement, intputElement2: HTMLInputElement): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
         
          inputElement.value = String(position.coords.latitude);
          intputElement2.value = String(position.coords.longitude);
    
        },
        () => {
          //handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      //handleLocationError(false, infoWindow, map.getCenter()!);
    }
    
  }



  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
