import { Component, OnInit } from '@angular/core';
import {
  tap,
  BehaviorSubject,
  shareReplay,
  mergeMap,
  switchMapTo,
  startWith,
  of,
  concatMap,
  interval,
  take,
  fromEvent,
  switchMap,
  map
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-root',
  template: `

  `
})
export class AppComponent {
  ngOnInit() {

    const switched = of(1, 2, 3).pipe(
      switchMap(x => ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1'))
    );


    switched.subscribe(console.log);


  }
}
