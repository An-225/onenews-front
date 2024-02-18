import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) {
    }

    searchTopic(topic: string, from: string, to: string, sort: string, source: string | null): Observable<any> {
        const url = 'http://localhost:8080/api/v1/search';
        let params = new HttpParams()
            .set('topic', topic)
            .set('from', from)
            .set('to', to)
            .set('sort', sort)

        if (source != null)
            params = params.set('source', source)

        return this.http.get(url, {params});
    }

    getSources(): Observable<any> {
        const url = 'http://localhost:8080/api/v1/sources';
        return this.http.get(url);
    }

}
