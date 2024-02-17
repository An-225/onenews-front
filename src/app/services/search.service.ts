import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) {
    }

    searchTopic(topic: string, from: string, to: string, sort: string): Observable<any> {
        const url = 'http://localhost:8080/api/v1/search';
        const params = new HttpParams()
            .set('topic', topic)
            .set('from', from)
            .set('to', to)
            .set('sort', sort);

        return this.http.get(url, {params});
    }

}
