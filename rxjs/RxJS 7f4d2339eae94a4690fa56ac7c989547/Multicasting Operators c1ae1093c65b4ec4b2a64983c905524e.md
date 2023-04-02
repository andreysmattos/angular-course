# Multicasting Operators

# shareReplay

Share source and replay specified number of emissions on subscription.

You generally want to use `shareReplay` when you have side-effects or taxing computations that you do not wish to be executed amongst multiple **subscribers.** 

### Example:

```jsx
const observable = ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(shareReplay(1));

observable.subscribe(console.log);
observable.subscribe(console.log);
// Issues only ONE request
```