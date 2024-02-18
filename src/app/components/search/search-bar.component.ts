import {Component, HostListener, ViewChild} from '@angular/core';
import {SharedService} from '../../services/shared-service.service';
import {SearchService} from 'src/app/services/search.service';
import * as moment from 'moment';
import {FormGroup} from "@angular/forms";
import {Moment} from "moment";
import {MatDialog} from "@angular/material/dialog";
import {SourceComponent} from "../source/source.component";

@Component({
    selector: 'search',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

    searchText: string = '';
    showProgressBar: boolean = false;
    showDateRangeSelector: boolean = false;
    showSortSelector: boolean = false;
    dynamicSearch: string[] = [];
    startDate: Moment = moment().subtract(30, 'days');
    endDate: Moment = moment();
    sortMethod: string = 'relevancy'
    selectedSources: string[] = [];
    sources: any[] = [];

    constructor(private sharedService: SharedService, private searchService: SearchService, private dialog: MatDialog) {
        this.sharedService.getDynamicSearchObservable().subscribe((dynamicSearch: string[]) => {
            this.dynamicSearch = dynamicSearch
        });

        this.sharedService.getSearchObservable().subscribe((chipValue: string) => {
            this.searchText = chipValue
            this.onSearch();
        });

        this.searchService.getSources().subscribe(value => {
            this.sources = value.sources
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

    onDateRangeSelected(range: FormGroup) {
        this.startDate = moment(range.value.start)
        this.endDate = moment(range.value.end)
        this.showDateRangeSelector = false;
    }

    openSortSelector() {
        this.showSortSelector = true;
    }

    openSourceSelector() {
        const dialogRef = this.dialog.open(SourceComponent,
            {
                data: {
                    'sources': this.sources,
                    'selectedSources': this.selectedSources
                }
            });
        dialogRef.componentInstance.sourcesSelected.subscribe(value => this.onSourceSelected(value))
        dialogRef.afterClosed().subscribe(() => {
        });
    }

    onSortMethodSelected(method: String) {
        this.sortMethod = method.toString()
        this.showSortSelector = false;
    }

    onSourceSelected(selectedSources: string[]) {
        this.selectedSources = selectedSources
    }
}
