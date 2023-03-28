import { Component, OnInit } from '@angular/core';
import {
  tap,
  BehaviorSubject,
  shareReplay,
  mergeMap,
  switchMapTo,
  startWith
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  template: `

  <div *ngIf="data$ | async as data; else loading">

    <h1> {{data['first_name']}} </h1>
    
    <button (click)="update()">update</button>
  </div>


  <div *ngIf="data$ | async as data2">{{data2['email']}}</div>
  
  <ng-template #loading >
    <div  style="width: 25px; height: 25px; margin: 15px; border-radius: 100%; border: solid 4px blue; border-left-color: transparent;"></div>
    <small>... carregando</small>
  </ng-template>

  `
})
export class AppComponent {

  data$ = this.appService.loadData().pipe(startWith(null));

  constructor(private appService: AppService) {
  }


  ngOnInit() {

    this.data$.subscribe(() => console.log('dalhe'));

    console.log('teste')
  }

  update() {

    this.appService.loadData();
    this.appService.loadData();
    this.appService.loadData();

    this.data$ = this.appService.loadData();
  }


}
