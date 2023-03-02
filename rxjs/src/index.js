import { of, from, fromEvent, interval } from "rxjs";
import { map, pluck, filter, reduce, take, scan } from "rxjs/operators";

const observable = interval(500).pipe(
  take(5),
  scan((acc, value) => acc + value, 0)
);

const sub = observable.subscribe({
  next: console.log,
  complete: () => console.log("complete"),
});

// setTimeout(() => {
//   sub.unsubscribe();
// }, 4000);

console.log("finished");
