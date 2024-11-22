import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-map-info-box',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './map-info-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapInfoBoxComponent {
  constructor(public dialogRef: MatDialogRef<MapInfoBoxComponent>) {}
  data = inject<DialogData>(MAT_DIALOG_DATA)
  date = this.data.ts.toDate()
  url = 'https://www.google.com/maps/dir/?api=1&destination=' + String(this.data.crd.lat) + '%2C' + String(this.data.crd.lng)

  closeDialog(): void {
    this.dialogRef.close('hi');
  }
}
export interface DialogData {
  des: any;
  img: any;
  crd: any;
  un: any;
  ts: any;
}
