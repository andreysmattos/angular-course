import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, delay, EMPTY, interval, map, of, take, tap, timeInterval } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <h1>Valor: </h1>
  <ng-container *ngIf="total$ | async as total">
    <h2>{{total}}</h2>
  </ng-container>
<br>
<br>
<br>
  <button (click)="troca()"> Mudar</button>
  `
})
export class AppComponent {

  total$ = interval(250).pipe(
    map(item => item * Math.round(Math.random() * 100)),
    take(50),
  )


  troca() {
    this.total$ = interval(100)
  }

}
