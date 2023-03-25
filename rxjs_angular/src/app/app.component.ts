import { Component, OnInit } from '@angular/core';
import { from, map, of, tap, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // this.introduction();
    // this.pipes();


  }



  pipes() {
    of(2, 4, 6).pipe(map(value => value * 2)).subscribe(console.log);

    of(1, 2, 3, 4, 5, 6).pipe(tap(console.log)).subscribe();

    of(1, 2, 3, 4, 5, 6).pipe(
      tap(value => {
        if (value > 3) {
          throw new TypeError(`Value ${value} is greater than 3`);
        }
      })
    ).subscribe({
      next: item => console.log('next: ' + item),
      complete: () => console.log('completed'),
      error: err => console.log(' - - - ENTROU NO ERROR')
    });


    of(1, 2, 3, 4, 5, 6).pipe(
      tap(console.log),
      map(item => item * 2),
      tap(console.log),
      map(item => item - 3),
      tap(console.log),
    ).subscribe();


    of(1, 2, 3).pipe(
      take(2)
    ).subscribe(console.log);


    of(1, 2, 3, 4, 5, 6).pipe(
      tap(console.log),
      map(item => item * 2),
      take(2),
      tap(console.log),
      map(item => item - 3),
      tap(console.log),
    ).subscribe();


    from([20, 15, 10, 5])
      .pipe(
        tap(item => console.log('emitted item: ', item)),
        map(item => item * 2),
        map(item => item - 10),
        map(item => {
          if (item === 0) throw new Error('zero detected');
        }),
        take(3)
      )
      .subscribe({
        next: item => console.log('next: ', item),
        complete: () => console.log('completed'),
        error: (err) => console.error(err),
      })


  }



  introduction() {
    of(1, 2, 3).subscribe(console.log);

    from([20, 15, 38]).subscribe({
      next: item => console.log('next: ' + item),
      complete: () => console.log("completed"),
      error: err => console.error(err)
    });

    of('Andrey', "Silva", "Mattos").subscribe({
      next: name => console.log("name: " + name),
      complete: () => console.log("completed")
    })
  }
}
