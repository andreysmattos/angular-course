import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ThreeService } from './three.service';

@Component({
  selector: 'app-three',
  template: `
  <ng-container *ngIf="users$ | async as users; else loading">

    <ul>
      <li *ngFor="let user of users">{{user.name}}</li>
    </ul>

    <h1 *ngIf="users$ | async as users"> + 1 Request </h1>

  </ng-container>

  <ng-template #loading>
    <div style="background-color: chocolate; padding: 10px">
        Loading...
    </div>
  </ng-template>


  <button (click)="update()">Atualizar dados</button>
  `
})
export class ThreeComponent {

  constructor(private threeService: ThreeService) { }

  users$ = this.threeService.loadUsers();

  update() {
    this.users$ = this.threeService.loadUsers();
  }

}
