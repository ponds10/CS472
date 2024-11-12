import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow, GoogleMapsModule } from '@angular/google-maps';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { MapInfoBoxComponent } from "./map-info-box/map-info-box.component";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal/modal.component';
import { MapService } from '../../../core/services/map/map.service';


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

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow
  @ViewChild(GoogleMap) map!: GoogleMap

  center: google.maps.LatLngLiteral = {lat: 36.180545979079874, lng: -115.17917779168842}
  zoom = 11

  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 36.180545979079874, lng: -115.17917779168842 }]

  openInfoWindow(marker: MapAdvancedMarker) {
    this.infoWindow.open(marker)
  }

  createNewMarkerControl(map: GoogleMap) {
    const controlButton = document.createElement('button')

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
      console.log('Button works!')
      this.openDialog()
      
    });

    return controlButton
  }

  readonly dialog = inject(MatDialog);
    
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }


  addControl() {
    const newMarkerControl = this.createNewMarkerControl(this.map)
    const newMarkerControlDiv = document.createElement('div')
    newMarkerControlDiv.appendChild(newMarkerControl)
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(newMarkerControlDiv)
  }
  
}
