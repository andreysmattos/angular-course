# Combination Operators

# combineLatest

Combines multiple Observables to create an Observable whose values are calculated from the latest values of each of its input Observables.

Whenever any input Observable emits a value, it computed a formula using the latest values from all the inputs, then emits the output of that formula.

**Be aware that `combineLatest` will not emit an initial value until each observable emits at least one value.**

![Untitled](Combination%20Operators%207160305ae4ba45c7884854050a58619f/Untitled.png)

### Example:

```jsx
const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
const combinedTimers = combineLatest([firstTimer, secondTimer]);
combinedTimers.subscribe(value => console.log(value));
// Logs
// [0, 0] after 0.5s
// [1, 0] after 1s
// [1, 1] after 1.5s
// [2, 1] after 2s
```

# concat

# merge

Turn multiple observables into a single observable.

Flattens multiple Observables together by blending their values into one Observable.

![Untitled](Combination%20Operators%207160305ae4ba45c7884854050a58619f/Untitled%201.png)

### Example:

```jsx
const clicks = fromEvent(document!, 'click');
const timer = interval(1000);

merge(clicks, timer).subscribe(console.log);

// Output:
// 0
// PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
// PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
// 1
// 2
// 3
// PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
```

---

# startWith

Emit given value first.

First emits its arguments in order, and then any emission from the source.

![Untitled](Combination%20Operators%207160305ae4ba45c7884854050a58619f/Untitled%202.png)

### Example:

```jsx
const source = of(1, 2, 3);

const example = source.pipe(startWith(-1, 0));

example.subscribe(console.log);
//Output: -1, 0, 1, 2, 3
```

# withLatestForm

Combine the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.

Whenever the source Observable emits a value, it computed a formula using that value plus the latest values from other input Observables, then emits the output of that formula.

![Untitled](Combination%20Operators%207160305ae4ba45c7884854050a58619f/Untitled%203.png)

### Example:

```jsx
const second$ = interval(3000);
interval(1000).pipe(withLatestFrom(second$)).subscribe(console.log);
// Output:
// [2, 0]
// [3, 0]
// [4, 0]
```

# forkJoin

Wait for Observables to complete and then combine last values they emitted; complete immediately if an empty array is passed.

This operator is best used when you have a group of observables and only care about the final emitted value of each. One common use case for this is if you wish to issue multiple request on page load (or some other event) and only want to take action when a response has been received for all.

- Be aware: If an observable does not complete `forkJoin` **will never emit a value.**

![Untitled](Combination%20Operators%207160305ae4ba45c7884854050a58619f/Untitled%204.png)

### Example:

```jsx
forkJoin({
  google: ajax.getJSON('https://api.github.com/users/google'),
  microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
  users: ajax.getJSON('https://api.github.com/users')
}).subscribe(console.log);
//Output: {google: {…}, microsoft: {…}, users: Array(30)}
```