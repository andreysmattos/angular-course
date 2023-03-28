import { Component, OnInit } from '@angular/core';
import {
  catchError,
  combineLatest,
  debounceTime,
  delay,
  EMPTY,
  forkJoin,
  fromEvent,
  interval,
  map,
  of,
  take,
  tap,
  timeInterval,
  timer,
  withLatestFrom,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  startWith
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  template: `
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis dolore quasi, veritatis possimus totam dolores eligendi! Vero ipsa itaque aliquid, repellendus harum nisi cum tempore illo pariatur magnam non libero!
  </p>
  `
})
export class AppComponent {

  constructor() {
    const source = of(1, 2, 3);

    const example = source.pipe(startWith(-1, 0));

    example.subscribe(console.log);

  }



}
