import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwoService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = "https://jsonplaceholder.typicode.com/users";

  users$ = this.httpClient.get<any[]>(this.apiUrl)
    .pipe(
      shareReplay(1)
    );

}
