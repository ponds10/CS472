import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { NavBarComponent } from '../../../shared/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [
    NavBarComponent,
    MatChipsModule,
    MatSliderModule,
    MatIcon,
    HeaderComponent,
    FormsModule,
  ],
  templateUrl: './documents-page.component.html',
  styleUrl: './documents-page.component.css',
})
export class DocumentsPageComponent {
  uploadedFiles: { name: string; type: string; date: string; folder: string }[] = [];
  maxDocuments = 50;
  file: File | null = null;

  constructor(private dialog: MatDialog) { }
  // skip tailwind css default input popup, skip to openUploadDialogWithFile
  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.openUploadDialogWithFile(file);
    }
  }

  openUploadDialogWithFile(file: File | null): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '400px',
      data: { preselectedFile: file },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.file && result?.type) {
        const date = new Date().toLocaleDateString();
        this.uploadedFiles.push({
          name: result.file.name,
          type: result.type,
          date,
          folder: result.type,
        });
      }
      
    });
  }
  // progress circle counter
  get progressPercentage(): number {
    return (this.uploadedFiles.length / this.maxDocuments) * 100;
  }
}

// for upload dialog popup
// needs styling lol
@Component({
  selector: 'upload-dialog',
  template: `
    <div mat-dialog-content class="p-10 text-xl w-fit">
      <h1 mat-dialog-title class="font-bold py-4">Upload Your Document</h1>
      <div mat-dialog-content>
        <input type="file" id="file" (change)="onFileSelected($event)" class="py-4"/>

        <label for="type" class="block mb-2">Select Type:</label>
        <select
          id="type"
          class="block w-full p-2.5 border-black focus:ring-blue-500 focus:border-blue-500"
          [(ngModel)]="fileType"
        >
          <option value="" disabled selected class="text-gray-500">Choose the type of document</option>
          <option value="Applications/Forms">Applications/Forms</option>
          <option value="Medical Documents">Medical Documents</option>
          <option value="ID and Licensing">Identification and Licensing</option>
          <option value="Misc. Documents">Misc. Documents</option>
        </select>
      </div>

      <div mat-dialog-actions>
      <button
          class="p-4"
          mat-button="{ file: selectedFile, type: fileType }"
          [disabled]="!selectedFile || !fileType"
          (click)="onUpload()"
        >
          Upload
        </button>
        <button class="p-4" mat-button (click)="onCancel()">Cancel</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [FormsModule],
})

// for upload dialog popup
export class UploadDialogComponent {
  selectedFile: File | null = null;
  fileType: string = '';

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onUpload(): void {
    if (this.selectedFile && this.fileType) {
      this.dialogRef.close({ file: this.selectedFile, type: this.fileType });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
