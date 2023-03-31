import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OneService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = "https://jsonplaceholder.typicode.com/users";


  getUsers() {
    return this.httpClient.get<any[]>(this.apiUrl);
  }

}
