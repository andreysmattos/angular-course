import { of, from, fromEvent } from "rxjs";
import { map, pluck, filter } from "rxjs/operators";

const observable = fromEvent(document, "keydown").pipe(
  pluck("code"),
  filter((code) => code === "Space")
);

const sub = observable.subscribe({
  next: console.log,
  complete: () => console.log("complete"),
});

// setTimeout(() => {
//   sub.unsubscribe();
// }, 4000);

console.log("finished");
