import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import IClip from 'src/app/models/clips.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null;

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

  constructor(public modal: ModalService) {

  }

  ngOnChanges() {
    console.log('teste123xxxxxxxxxxxxx')

    console.log('this.activeClip', this.activeClip);
    if (!this.activeClip) {
      return;
    }


    this.clipId.setValue(this.activeClip.uid);
    this.title.setValue(this.activeClip.fileName)

  }

  ngOnInit() {
    this.modal.register('editClip');
  }

  ngOnDestroy() {
    this.modal.unregister('editClip');
  }
}
