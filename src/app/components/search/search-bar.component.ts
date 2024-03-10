import {Component, HostListener} from '@angular/core';
import {SharedService} from '../../services/shared-service.service';
import {SearchService} from 'src/app/services/search.service';
import * as moment from 'moment';
import {Moment} from "moment";
import {FilterComponent} from "../filter/filter.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'search',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
    searchText: string = '';
    showProgressBar: boolean = false;
    dynamicSearch: string[] = [];
    startDate: Moment = moment().subtract(1, 'months');
    endDate: Moment = moment();
    sortMethod: string = 'relevancy'
    selectedSources: string[] = [];
    sources: any[] = [];

    constructor(private sharedService: SharedService, private searchService: SearchService, private dialog: MatDialog,) {
        this.sharedService.getDynamicSearchObservable().subscribe((dynamicSearch: string[]) => {
            this.dynamicSearch = dynamicSearch
        });

        this.sharedService.getSearchObservable().subscribe((chipValue: string) => {
            this.searchText = chipValue
            this.onSearch();
        });

        this.searchService.getSources().subscribe(value => {
            this.sources = value.sources
            this.openFiltersModal()
        })
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
        let from = this.startDate.format('YYYY-MM-DD');
        let to = this.endDate.format('YYYY-MM-DD');

        let source = this.selectedSources.length === 0 ? null : this.selectedSources.reduce((previousValue, currentValue) => previousValue.concat(',').concat(currentValue))

        this.searchService.searchTopic(this.searchText, from, to, this.sortMethod, source).subscribe((data: any) => {
            const status = data.status;

            if (status === 'ok') {
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

    openFiltersModal() {
        const dialogRef = this.dialog.open(FilterComponent,
            {
                data: {
                    'sources': this.sources,
                    'selectedSources': this.selectedSources
                }
            });
        dialogRef.componentInstance.filterChanged.subscribe(value => {
            this.selectedSources = value.selectedSources;
            this.startDate = value.startDate;
            this.endDate = value.endDate;
            this.sortMethod = value.sortMethod;
        })
        dialogRef.afterClosed().subscribe(() => {
        });
    }
}
