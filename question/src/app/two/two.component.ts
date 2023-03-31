import { Component } from '@angular/core';
import { TwoService } from './two.service';

@Component({
  selector: 'app-two',
  template: `
  <ng-container *ngIf="users$ | async as users">

    <ul>
      <li *ngFor="let user of users">{{user.name}}</li>
    </ul>

  </ng-container>

  <h1 *ngIf="users$ | async as users"> + 1 Request </h1>
`

})
export class TwoComponent {
  constructor(private twoService: TwoService) { }

  users$ = this.twoService.users$;

}
