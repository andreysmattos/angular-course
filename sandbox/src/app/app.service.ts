import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {}

    loadData() {
        return this.http.get<any>(`https://random-data-api.com/api/v2/users?size=1&is_xml=true`)
            .pipe(
                shareReplay(1)
            );
    }


}
