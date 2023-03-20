import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  constructor(private storage: AngularFireStorage) {

  }

  isDragover = false;
  file: File | null = null;
  nextStep = false;

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  });

  formGroup: FormGroup = new FormGroup({
    title: this.title
  });

  storeFile(event: Event) {
    this.isDragover = false;
    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if (!this.file || this.file.type !== "video/mp4") {
      console.log('não é um vídeo')
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^\.]+$/, ""));
    this.nextStep = true;

    console.log(event);
  }


  handleSubmit(event: Event) {
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`;

    this.storage.upload(clipPath, this.file);


    // this.storage.
    // console.log({ event });
  }
}
