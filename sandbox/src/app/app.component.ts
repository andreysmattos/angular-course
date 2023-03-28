import { Component, OnInit } from '@angular/core';
import {
  tap,
  BehaviorSubject,
  shareReplay,
  mergeMap
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-root',
  template: `


  <div *ngIf="!(loading$ | async) else loading">

    <h1 *ngIf="products$ | async as products">{{products['first_name']}}</h1>
    
    <button (click)="update()">update</button>
  </div>
  
  <ng-template #loading >
    <div  style="width: 25px; height: 25px; margin: 15px; border-radius: 100%; border: solid 4px blue; border-left-color: transparent;"></div>
    <small>... carregando</small>
  </ng-template>

  `
})
export class AppComponent {

  private refresh = new BehaviorSubject<void>(undefined);
  public loading$ = new BehaviorSubject(true);

  products$ = this.refresh.pipe(
    tap(() => this.loading$.next(true)),
    mergeMap(() => ajax.getJSON<any>('https://random-data-api.com/api/v2/users?size=1&is_xml=true')),
    tap(() => this.loading$.next(false)),

    shareReplay(1),
  );

  constructor() {
    // varios subscribe sem fazer requests
    this.products$.subscribe(console.log)
    this.products$.subscribe(console.log)
    this.products$.subscribe(console.log)
    this.products$.subscribe(console.log)
    this.products$.subscribe(console.log)

  }

  update() {
    // faz request para atualizar os dados
    // carrega o loading de forma automatica
    this.refresh.next();
  }

}
