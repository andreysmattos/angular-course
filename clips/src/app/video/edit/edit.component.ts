import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import IClip from 'src/app/models/clips.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy{

  @Input() activeClip: IClip | null = null;

  constructor(public modal: ModalService) {

  }

  ngOnInit() {
    console.log('teste123')
    this.modal.register('editClip');
  }

  ngOnDestroy() {
    this.modal.unregister('editClip');
  }
}
