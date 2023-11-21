import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchTopic(topic: string, from: string, to: string): Observable<any> {
    const url = 'https://ivory-enigma-405820.uc.r.appspot.com/api/v1/search';
    const params = new HttpParams()
      .set('topic', topic)
      .set('from', from)
      .set('to', to);

    return this.http.get(url, { params });
  }

}
