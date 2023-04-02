# Creation Operators

# of

It is used to emit arguments as values in a sequence and then complete the stream.

![Untitled](Creation%20Operators%204e47445a76254e61954ffc30a5d659c6/Untitled.png)

### Example:

```jsx
const observable = of(1, 2, 3, [4, 5, 6]);

observable.subscribe({
  next: value => console.log('next:', value),
  error: err => console.log('error:', err),
  complete: () => console.log('the end'),
});

// Outputs
// next: 1
// next: 2
// next: 3
// next: [4, 5, 6]
// the end
```

---

# from

Turn an array, promise, or iterable into an observable.

- This operator can be used to convert a promise to an observable!
- For arrays and iterables, all contained values will be emitted as a sequence!
- This operator can also be used to emit a string as sequence of characters.

![Untitled](Creation%20Operators%204e47445a76254e61954ffc30a5d659c6/Untitled%201.png)

### Example

```jsx
const array = [10, 20, 30];
const result = from(array);

result.subscribe(x => console.log(x));

// Logs:
// 10
// 20
// 30
```

---

# ajax

It creates an observable for an Ajax request with either a request object with URL, headers, etc or a string for a URL.

### Example:

```jsx
const observable = ajax('https://api.github.com/users?per_page=2');

observable.subscribe({
  next: value => console.log('next:', value),
  error: err => console.log('error:', err),
  complete: () => console.log('the end'),
});
```