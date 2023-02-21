import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = "andrey mattos";
  imgUrl = 'https://fastly.picsum.photos/id/237/500/500.jpg?hmac=idOEkrJhLd7nEU5pNrAGCyJ6HHJdR_sit1qDt5J3Wo0'
  images = [
    'https://fastly.picsum.photos/id/237/500/500.jpg?hmac=idOEkrJhLd7nEU5pNrAGCyJ6HHJdR_sit1qDt5J3Wo0',
    'https://fastly.picsum.photos/id/237/500/500.jpg?hmac=idOEkrJhLd7nEU5pNrAGCyJ6HHJdR_sit1qDt5J3Wo0',
    'https://fastly.picsum.photos/id/237/500/500.jpg?hmac=idOEkrJhLd7nEU5pNrAGCyJ6HHJdR_sit1qDt5J3Wo0',
  ];
  
  currentDate = new Date();
  price = 279.8
  temperature = 25.3516
  pizza = { toppings: ['pepperoni', 'bacon'], size: 'large' };

  blueClass = true;
  fontSize = 16

  changeImg(event: KeyboardEvent) {
    this.imgUrl = (event.target as HTMLInputElement).value
  }

  getName() {
    return this.name
  }


  logImage(value: string) {
    console.log(value)
  }
}