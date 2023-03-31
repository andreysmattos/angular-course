import { Component } from '@angular/core';
import { OneService } from './one.service';

@Component({
  selector: 'app-one',
  template: `
  
    <ul>
      <li *ngFor="let user of users">{{user.name}}</li>
    </ul>
    
  `
})
export class OneComponent {

  constructor(private oneService: OneService) { }

  users$ = this.oneService.getUsers();

  users: any[] = [];


  ngOnInit() {
    this.users$.subscribe(users => {
      this.users = users;
    })
  }

}
