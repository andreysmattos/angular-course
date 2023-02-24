import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean
}

@Injectable({
  providedIn: "root"
})
export class ModalService {
  protected modals: IModal[] = [];

  constructor() { }

  register(id: string) {
    this.modals.push({ id, visible: false })
  }

  unregister(id: string) {
    this.modals = this.modals.filter(item => item.id !== id);
  }


  isModalOpen(id: string): boolean {
    return Boolean(this.modals.find(item => id === item.id)?.visible);
  }


  toggleModal(id: string) {
    const modal = this.modals.find(item => id === item.id);
    if (!modal) return;
    modal.visible = !modal.visible;
    return false;
  }
}
