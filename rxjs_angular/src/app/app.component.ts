import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs_angular';


  ngOnInit() {
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
