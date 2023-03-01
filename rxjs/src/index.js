import { of, from } from "rxjs";
import { map } from "rxjs/operators";

const observable = of(5, 8, 10, 18, 20, 25);

const numberWithSymbol = observable.pipe(map((value) => {
  return "$" + value
}));

const sub = observable.subscribe({
  next: console.log,
  complete: () => console.log("complete"),
});

numberWithSymbol.subscribe({
  next: console.log,
  complete: () => console.log("complete"),
});
// setTimeout(() => {
//   sub.unsubscribe();
// }, 4000);

console.log("finished");
