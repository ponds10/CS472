import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  mapService = inject(MapService);
  //user$ = this.mapService.user$;
  description: string = '';
  slat: string = '';
  slng: string = '';
  lat: number = 0;
  lng: number = 0;
  file: File | null = null;

  

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private cdr: ChangeDetectorRef) {}

  onSubmit(): void {

    this.lat = parseFloat(this.slat);
    this.lng = parseFloat(this.slng);

    if (this.lat && this.lng && this.description) {
      this.mapService.saveMarker(this.lat, this.lng, this.description, this.file)
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

  getpostion(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
         
          this.slat = String(position.coords.latitude);
          this.slng = String(position.coords.longitude);
          this.cdr.detectChanges();
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

  getImage (event: any) {
    const imgFile: File = event.target.files[0];
    if (!imgFile) {
      return;
    }
    this.file = imgFile;
    this.cdr.detectChanges();
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
