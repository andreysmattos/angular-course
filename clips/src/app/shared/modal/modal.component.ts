import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService]
})
export class ModalComponent implements OnInit {

  @Input() modalID = "";

  constructor(public modal: ModalService, public element: ElementRef) {

    // console.log(this.modal.isModalOpen())
  }

  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement);
    // console.log(this.element)
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }
}
