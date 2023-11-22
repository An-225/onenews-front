import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private searchSubject = new Subject<string>();
  private dynamicSearchSubject = new Subject<string[]>();
  private clearChipsSubject = new Subject<void>();
  private articlesSource = new Subject<any>();
  private searchOptionsSubject: Subject<string> = new Subject<string>();
  private showCardsSubject = new BehaviorSubject<boolean>(false);
  clearChips$ = this.clearChipsSubject.asObservable();
  showCards$ = this.showCardsSubject.asObservable();
  searchOptions$ = this.searchOptionsSubject.asObservable();
  articles$ = this.articlesSource.asObservable();

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
  clearChips() {
    this.clearChipsSubject.next();
  }
}