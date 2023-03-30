import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, of, tap, concatMap, mergeMap, switchMap } from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';


  supllierWithConcatMap$ = of(1, 5, 8).pipe(
    tap(id => console.log('ConcatMap source Operator: ', id)),
    concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  supllierWithMergeMap$ = of(1, 5, 8).pipe(
    tap(id => console.log('MergeMap source Operator: ', id)),
    mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  supllierWithSwitchMap$ = of(1, 5, 8).pipe(
    tap(id => console.log('SwitchMap source Operator: ', id)),
    switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );


  constructor(private http: HttpClient) {
    // this.supllierWithConcatMap$.subscribe(item => console.log('concatMap result:', item));
    // this.supllierWithMergeMap$.subscribe(item => console.log('MergeMap result:', item));
    // this.supllierWithSwitchMap$.subscribe(item => console.log('Switch result:', item));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
