import {Component, HostListener, ViewChild} from '@angular/core';
import {SharedService} from '../../services/shared-service.service';
import {SearchService} from 'src/app/services/search.service';
import * as moment from 'moment';
import {FormGroup} from "@angular/forms";
import {Moment} from "moment";
import {MatDialog} from "@angular/material/dialog";
import {SourceComponent} from "../source/source.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    minStartDate: Moment = moment().subtract(1, 'months');
    maxEndDate: Moment = moment();
    startDate: Moment = moment().subtract(1, 'months');
    endDate: Moment = moment();
    sortMethod: string = 'relevancy'
    selectedSources: string[] = [];
    sources: any[] = [];

    constructor(private sharedService: SharedService, private searchService: SearchService, private dialog: MatDialog, private snackBar: MatSnackBar) {
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
        let tempStartDate = moment(range.value.start);
        let tempEndDate = moment(range.value.end);
        if (tempStartDate.isBefore(this.minStartDate) || tempEndDate.isAfter(this.maxEndDate)) {
            this.openSnackBar('O período máximo é de 1 meŝ', 'fechar')
            this.showDateRangeSelector = false;
            return;
        }

        this.startDate = tempStartDate
        this.endDate = tempEndDate
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

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action);
    }
}
