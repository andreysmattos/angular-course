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
  ReplaySubject
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
    const subject = new Subject();
    const behaviorSubject = new BehaviorSubject(-1);

    subject.next(0); // não vai mostrar
    behaviorSubject.next(0);

    subject.subscribe(value => console.log('Subject: ' + value))
    behaviorSubject.subscribe(value => console.log('Behavior: ' + value))

    subject.next(1);
    behaviorSubject.next(1);

    subject.next(2);
    behaviorSubject.next(2);

    const onlyObservable = behaviorSubject.asObservable(); 
    // onlyObservable não pode usar o .next quando é usado o asObservable

    behaviorSubject.next(123)


    onlyObservable.subscribe(console.log)

  }



}
