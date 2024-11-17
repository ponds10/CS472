import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import {
  GoogleMap,
  MapAdvancedMarker,
  MapInfoWindow,
  GoogleMapsModule,
} from '@angular/google-maps';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { MapInfoBoxComponent } from './map-info-box/map-info-box.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal/modal.component';
import { MapService } from '../../../core/services/map/map.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMap,
    GoogleMapsModule,
    MapAdvancedMarker,
    MapInfoWindow,
    HeaderComponent,
    NavBarComponent,
    MapInfoBoxComponent,
    ModalComponent,
  ],
  templateUrl: './map-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
  mapService = inject(MapService);

  constructor(private cdr: ChangeDetectorRef) { }

  @ViewChild(GoogleMap) map!: GoogleMap;

  options: google.maps.MapOptions = {
    center: {
    lat: 36.180545979079874,
    lng: -115.17917779168842,
    },
    zoom: 11,
    mapTypeControl: false,
    streetViewControl: false
  }

  markers$ = this.mapService.loadMarkers() as Observable<DocumentData[]>;

  outputTest() {
    console.log('hello')
  }
  

  openInfoWindow(marker: MapAdvancedMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  createNewMarkerControl(map: GoogleMap) {
    console.log('Called create control')
    const controlButton = document.createElement('button');

    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.borderRadius = '3px';
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlButton.style.color = 'rgb(25,25,25)';
    controlButton.style.cursor = 'pointer';
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlButton.style.fontSize = '16px';
    controlButton.style.lineHeight = '38px';
    controlButton.style.margin = '8px 0 22px';
    controlButton.style.padding = '0 5px';
    controlButton.style.textAlign = 'center';

    controlButton.textContent = 'Report Cat';
    controlButton.title = 'Click to create new marker';
    controlButton.type = 'button';

    controlButton.addEventListener('click', () => {
      console.log('Button works!');
      this.openDialog();
    });

    return controlButton;
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openInfoDialog(description: any, image: any, coordinates: any, username: any, timestamp: any): void {
    const dialogRef = this.dialog.open(MapInfoBoxComponent, {
      data: {des: description, img: image, crd: coordinates, un: username, ts: timestamp}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addControl() {
    this.cdr.detectChanges();
    console.log('called addControl')
    const newMarkerControl = this.createNewMarkerControl(this.map);
    const newMarkerControlDiv = document.createElement('div');
    newMarkerControlDiv.appendChild(newMarkerControl);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      newMarkerControlDiv
    );
    
  }
}
