import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = "https://jsonplaceholder.typicode.com/users";

  _users = new BehaviorSubject<any>(null);
  get users$(): Observable<any[]> {
    return this._users.asObservable();
  }


  loadUsers() {
    return this.httpClient.get<any[]>(this.apiUrl).pipe(
      tap(users => {
        this._users.next(users);
      }),
      shareReplay(1)
    );
  }


}
