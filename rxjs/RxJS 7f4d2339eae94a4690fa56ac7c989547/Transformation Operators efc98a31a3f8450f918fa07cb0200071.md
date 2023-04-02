# Transformation Operators

Transforming values as they pass through the operator chain is a common task. These operators provide transformation techniques for nearly any use-case you will encounter.

# bufferTime

Collects values from the past as an array, and emits those arrays periodically in time.

![Untitled](Transformation%20Operators%20efc98a31a3f8450f918fa07cb0200071/Untitled.png)

### Example:

```jsx
const btn = document.querySelector('#btn')!;

const observable = fromEvent(btn, 'click').pipe(bufferTime(1000));

observable.subscribe(console.log)

//ex. OUTPUT
// []
// (4) [PointerEvent, PointerEvent, PointerEvent, PointerEvent]
// (6) [PointerEvent, PointerEvent, PointerEvent, PointerEvent, PointerEvent, PointerEvent]
// (6) [PointerEvent, PointerEvent, PointerEvent, PointerEvent, PointerEvent, PointerEvent]
// (5) [PointerEvent, PointerEvent, PointerEvent, PointerEvent, PointerEvent]
// []
// []
// []
// []
```

---

# map

Like `[].map` , it passes each source value through a transformation function to get corresponding output values.

![Untitled](Transformation%20Operators%20efc98a31a3f8450f918fa07cb0200071/Untitled%201.png)

### Example:

```jsx
const observable = from([1, 2, 3, 4, 5]).pipe(map(value => value * 10));

observable.subscribe(console.log);

//Output
// 10
// 20
// 30
// 40
// 50
```

---

# scan

It’s like `reduce` , but emits the current accumulation state after each update.

![Untitled](Transformation%20Operators%20efc98a31a3f8450f918fa07cb0200071/Untitled%202.png)

### Example:

```jsx
const observable = from([1, 2, 3, 4, 5]).pipe(scan((acc, curr) => acc + curr));

observable.subscribe(console.log);

// Output
// 1
// 3
// 6
// 10
// 15
```

---

# concatMap

Map values to inner observable, subscribe and emit in order.

Projects each source value to an Observable which is merged in the output Observable, in a serialized fashion waiting for each one to complete before merging the next.

![Untitled](Transformation%20Operators%20efc98a31a3f8450f918fa07cb0200071/Untitled%203.png)

### Eample:

```jsx
const clicks = fromEvent(document, 'click');

const result = clicks.pipe(
  concatMap(ev => interval(500).pipe(take(4)))
);
result.subscribe(x => console.log(x));
```

---

# mergeMap

Transform each emitted item to new (inner) Observable as defined by function.

`mergeMap( i ⇒ of(i) )`

It executes inner Observables in **parallel.**

And merge their results.

### Example:

```jsx
const clicks = fromEvent(document, 'click');

const result = clicks.pipe(
  switchMap(ev => interval(500).pipe(take(4)))
);
result.subscribe(x => console.log(x));
```

---

# swtichMap

Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.

The main difference between `switchMap` and other flattening operators is the cancelling effect. On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed. 

- You can remember this by the phase **switch to a new observable.**

### Example:

```jsx
const switched = of(1, 2, 3).pipe(
  switchMap(x => ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1'))
);

switched.subscribe(console.log);

// Output: Only the last request
```