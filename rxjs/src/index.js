import { Observable } from "rxjs";

const observable = new Observable((subscriber) => {
    // apagar todos esses subscriber para proxima aula
  subscriber.next("Hello world");

  subscriber.error('Error!')

  subscriber.next("test");
  subscriber.complete();
  subscriber.next("last next");
});

observable.subscribe({
  next: (value) => {
    console.log("next value: ");
    console.log(value);
  },
  complete: () => {
    console.log("complete called");
  },
  error: (error) => {
    console.error(error);
  },
});
