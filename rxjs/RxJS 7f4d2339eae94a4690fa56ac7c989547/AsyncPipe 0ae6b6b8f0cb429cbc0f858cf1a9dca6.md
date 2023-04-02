# AsyncPipe

The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has emitted. When a new value is emitted, the `async` pipe marks the component to be checked for changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid potential memory leaks. When the reference of the expression changes, the `async` pipe automatically unsubscribes from the old `Observable` or `Promise` and subscribes to the new one.

### Example:

```jsx
@Component({
  selector: 'app-root',
  template: `
  <h1>Valor: </h1>
  <ng-container *ngIf="total$ | async as total">
    <h2>{{total}}</h2>
  </ng-container>
  `
})
export class AppComponent {

  total$ = interval(250).pipe(
    map(item => item * Math.round(Math.random() * 100)),
    take(50),
  )

}
```