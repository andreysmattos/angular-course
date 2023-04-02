# Utility Operators

# Tap

The propose of the `tap` operator is perform an operation that does not affect the emitted items.

Used when you want to affect outside state with a notification without altering the notification.

Used for:

- Debugging
- Perming actions outside of the flow of data (side effects)

![Untitled](Utility%20Operators%207d281c8836e5467ba3f1bae7c7725978/Untitled.png)

### Example:

```jsx
of(1, 2, 3, 4, 5, 6).pipe(tap(console.log)).subscribe();
//Output: 1, 2, 3, 4, 5, 6
```