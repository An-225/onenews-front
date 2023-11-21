import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private showCardsSubject = new BehaviorSubject<boolean>(false);
  showCards$ = this.showCardsSubject.asObservable();
  private searchOptionsSubject: Subject<string> = new Subject<string>();
  searchOptions$ = this.searchOptionsSubject.asObservable();
  private articlesSource = new Subject<any>();
  articles$ = this.articlesSource.asObservable();
  private searchSubject = new Subject<string>();
  private dynamicSearchSubject = new Subject<string[]>();

  setShowCards(value: boolean) {
    this.showCardsSubject.next(value);
  }

  setSearchOptions(options: string) {
    this.searchOptionsSubject.next(options);
  }

  getDynamicSearchObservable() {
    return this.dynamicSearchSubject.asObservable();
  }

  setArticles(articles: any) {
    console.log(articles)
    this.articlesSource.next(articles);
  }

  onSearchTriggered(search: string) {
    this.searchSubject.next(search);
  }

  setDynamicSearch(dynamicSearch: string[]) {
    this.dynamicSearchSubject.next(dynamicSearch);
  }

  getSearchObservable() {
    return this.searchSubject.asObservable();
  }

}