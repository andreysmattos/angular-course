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
  switchMap
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-root',
  template: `

  `
})
export class AppComponent {




  ngOnInit() {

    const clicks = fromEvent(document, 'click');

    const result = clicks.pipe(
      switchMap(ev => interval(500).pipe(take(4)))
    );
    result.subscribe(x => console.log(x));
  }




}
