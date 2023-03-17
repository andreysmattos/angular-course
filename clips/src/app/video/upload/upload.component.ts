import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  isDragover = false;
  file: File | null = null;

  storeFile(event: Event) {
    this.isDragover = false;
    this.file = (event as DragEvent).dataTransfer?.files.item(0) as File;

    console.log(event);
  }
}
