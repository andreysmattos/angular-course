# Error Handling Operators

# catchError

Gracefully handle errors in an observable sequence.

Catches errors on the observable to be handled by returning a new observable or throwing an error.

- Remember to return an observable from the catchError function!

### Example:

```jsx
of(1, 2, 3, 4, 5).pipe(
  tap(item => {
    if (item == 4) {
      throw new Error('Deu ruim. item == 4')
    }
  }),

  map(item => item * 5),

  catchError(err => {

    return of('String retornada dentro do error.');
  })

).subscribe({
  next: item => console.log(`Next: ${item}`),
  complete: () => console.log("Completed"),
  error: err => {
    console.log('DEU ERRO AKI: '); // não vai entrar aki
    console.log(err);
  }
});

//Output:
// Next: 5
// Next: 10
// Next: 15
// Next: String retornada dentro do error.
// Completed

```