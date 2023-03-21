import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { last, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {

  constructor(
    private storage: AngularFireStorage,
    public auth: AngularFireAuth,
    private clipService: ClipService,
    private router: Router
  ) {
    this.auth.user.subscribe(user => this.user = user);
  }

  user: firebase.User | null = null;
  isDragover = false;
  file: File | null = null;
  nextStep = false;

  task?: AngularFireUploadTask;

  showAlert = false;
  alertColor = 'blue';
  alertMessage = "";
  isSubmission = false;
  percentage = 0;
  showPercentage = false;

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  });

  formGroup: FormGroup = new FormGroup({
    title: this.title
  });

  ngOnDestroy() {
    console.log('dalhe');
    this.task?.cancel();
  }

  storeFile(event: Event) {
    this.isDragover = false;


    this.file = (event as DragEvent).dataTransfer ? (event as DragEvent).dataTransfer?.files.item(0) ?? null
      : (event.target as HTMLInputElement).files?.item(0) ?? null

    if (!this.file || this.file.type !== "video/mp4") {
      console.log('não é um vídeo')
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^\.]+$/, ""));
    this.nextStep = true;

    console.log(event);
  }


  async handleSubmit(event: Event) {
    this.formGroup.disable()
    this.isSubmission = true;
    this.showPercentage = true;
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`;

    this.alertColor = 'blue';
    this.alertMessage = 'Please wait!'
    this.showAlert = true;

    this.task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);

    this.task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100;
    })

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {

        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        const clipDocRef = await this.clipService.create(clip);

        this.showPercentage = false;
        this.alertColor = 'green';
        this.alertMessage = 'Success!'
        this.isSubmission = false;

        setTimeout(() => {
          this.router.navigate(['clip', clipDocRef.id])
        }, 1000)
      },
      error: (error) => {
        this.formGroup.enable();
        console.error(error);
        this.alertColor = 'red';
        this.alertMessage = 'Something went wrong!';
        this.isSubmission = true
      }
    })


  }
}
