import { Component, OnInit } from '@angular/core';
import { catchError, combineLatest, debounceTime, delay, EMPTY, forkJoin, fromEvent, interval, map, of, take, tap, timeInterval, timer, withLatestFrom } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  template: `
  <h1> Teste </h1> 

  <button id="btn1">btn1</button> <br />
  <button id="btn2">btn2</button> <br />
  <button id="btn3">btn3</button> <br />
  `
})
export class AppComponent {

  constructor() {

  }

  ngAfterViewInit() {

    const second$ = interval(3000);
    interval(1000).pipe(withLatestFrom(second$)).subscribe(console.log)

  }

}
