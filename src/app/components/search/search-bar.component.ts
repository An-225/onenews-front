import { Component, HostListener, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SearchService } from 'src/app/services/search.service';
import * as moment from 'moment';

@Component({
  selector: 'search',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchText: string = '';
  showProgressBar: boolean = false;
  showDateRangeSelector: boolean = false;
  dynamicSearch: string[] = [];

  constructor( private sharedService: SharedService,private searchService: SearchService) {
    this.sharedService.getDynamicSearchObservable().subscribe((dynamicSearch: string[]) => {
      this.dynamicSearch = dynamicSearch
    });
  
    this.sharedService.getSearchObservable().subscribe((chipValue: string) => {
      this.searchText = chipValue
      this.onSearch();
    });
  }
  

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onSearch() {
    const trimmedSearchText = this.searchText.trim();
    if (trimmedSearchText === '') {
      return;
    }

    this.showProgressBar = true;
    let from = moment().subtract(30, 'days').format('YYYY-MM-DD');
    let to = moment().format('YYYY-MM-DD');

    this.searchService.searchTopic(this.searchText, from, to).subscribe((data: any) => {
      const status = data.status;

      if (status === 'ok') {
        const totalResults = data.totalResults;
        const articles = data.articles;
        this.showProgressBar = false;
        this.sharedService.setShowCards(true);

        if (!this.dynamicSearch.includes(this.searchText)) {
          this.sharedService.setSearchOptions(this.searchText);
        }
        
        this.sharedService.setArticles(articles);
        this.searchText = '';
      } else {
        this.showProgressBar = false;
      }
    });
  }


  openDateRangeSelector() {
    this.showDateRangeSelector = true;
  }

  onDateRangeSelected(range: any) {
    this.showDateRangeSelector = false;
  }

}
