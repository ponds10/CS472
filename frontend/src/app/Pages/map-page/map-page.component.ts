import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
import { HeaderComponent } from '../../../shared/header/header.component';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { MapInfoBoxComponent } from "./map-info-box/map-info-box.component";

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMap,
    MapAdvancedMarker,
    MapInfoWindow,
    HeaderComponent,
    NavBarComponent,
    MapInfoBoxComponent
],
  templateUrl: './map-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent { 
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  center: google.maps.LatLngLiteral = {lat: 36.180545979079874, lng: -115.17917779168842}
  zoom = 11

  markerPositions: google.maps.LatLngLiteral[] = [{ lat: 36.180545979079874, lng: -115.17917779168842 }]

  openInfoWindow(marker: MapAdvancedMarker) {
    this.infoWindow.open(marker)
  }

}
