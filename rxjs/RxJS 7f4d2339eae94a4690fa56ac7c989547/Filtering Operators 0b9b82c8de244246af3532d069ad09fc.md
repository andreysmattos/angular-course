# Filtering Operators

# Take

Take the first ***count*** values from the source, then completes.

Used for:

- Taking a specified number of items.
- Limiting unlimited Observables. (ex: interval)

![Untitled](Filtering%20Operators%200b9b82c8de244246af3532d069ad09fc/Untitled.png)

### Example:

```jsx
of(1, 2, 3).pipe(
  take(2)
).subscribe(console.log);
// Output: 1,2
```