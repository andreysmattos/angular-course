import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import IClip from 'src/app/models/clips.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();


  showAlert = false
  alertColor = "blue"
  alertMessage = "Please wait! Updating clip.";
  isSubmission = false

  clipId = new FormControl('', {
    validators: [Validators.required],
    nonNullable: true
  });

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true
  });

  editForm: FormGroup = new FormGroup({
    title: this.title,
    id: this.clipId
  });

  constructor(
    public modal: ModalService,
    public clipService: ClipService
  ) {

  }

  ngOnChanges() {
    console.log('teste123xxxxxxxxxxxxx')

    console.log('this.activeClip', this.activeClip);
    if (!this.activeClip) {
      return;
    }

    this.isSubmission = false;
    this.showAlert = false;


    this.clipId.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title)

  }

  ngOnInit() {
    this.modal.register('editClip');
  }

  ngOnDestroy() {
    this.modal.unregister('editClip');
  }


  async handleSubmit() {

    if(!this.activeClip) return;

    console.log('this.clipId.value, this.title.value', this.clipId.value, this.title.value)
    this.isSubmission = true;
    this.alertMessage = "Please wait! updating clip";
    this.alertColor = 'blue';
    this.showAlert = true;

    try {
      await this.clipService.updateClip(this.clipId.value, this.title.value);
    } catch (error) {

      this.alertColor = 'red';
      this.alertMessage = "Something went wrong. Try again later.";
      console.error(error);
      return;
    }

    this.isSubmission = false;
    this.alertColor = 'green';
    this.alertMessage = "Success!";

    this.activeClip.title = this.title.value;

    this.update.emit(this.activeClip);

  }
}
