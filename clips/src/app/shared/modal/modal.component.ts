import { Component, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() modalID = "";

  constructor(public modal: ModalService, public element: ElementRef) {

    // console.log(this.modal.isModalOpen())
  }

  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement);
    // console.log(this.element)
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.element.nativeElement)
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }
}
