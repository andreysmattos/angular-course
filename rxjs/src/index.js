import { of, from, fromEvent, interval } from "rxjs";
import {
  map,
  pluck,
  filter,
  reduce,
  take,
  scan,
  tap,
  mergeMap,
  switchMap,
  concatMap,
  exhaustMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const button = document.querySelector("#btn");

const observable = fromEvent(button, "click").pipe(
  exhaustMap(() => {
    return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
  })
);

const sub = observable.subscribe({
  next: console.log,
  complete: () => console.log("complete"),
});

// setTimeout(() => {
//   sub.unsubscribe();
// }, 4000);

console.log("finished");
