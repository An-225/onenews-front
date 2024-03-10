import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SourceComponent, SourceDialogData} from "../source/source.component";
import * as moment from 'moment';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Moment} from "moment";

export interface FilterData {
    selectedSources: string[],
    startDate: Moment,
    endDate: Moment,
    sortMethod: string
}

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent {
    minStartDate: Moment = moment().subtract(1, 'months');
    maxEndDate: Moment = moment();
    startDate: Moment = moment().subtract(1, 'months');
    endDate: Moment = moment();
    sortMethod: string = 'relevancy'
    selectedSources: string[] = [];
    sources: any[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: SourceDialogData, private dialog: MatDialog, private snackBar: MatSnackBar) {
        this.sources = data.sources
        this.selectedSources = data.selectedSources
    }

    onDateRangeSelected(range: FormGroup) {
        let tempStartDate = moment(range.value.start);
        let tempEndDate = moment(range.value.end);
        if (tempStartDate.isBefore(this.minStartDate) || tempEndDate.isAfter(this.maxEndDate)) {
            this.openSnackBar('O período máximo é de 1 mês', 'fechar')
            return;
        }

        this.startDate = tempStartDate
        this.endDate = tempEndDate
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
    }

    onSourceSelected(selectedSources: string[]) {
        this.selectedSources = selectedSources
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action);
    }

    onClose() {
        this.filterChanged.emit({
            selectedSources: this.selectedSources,
            startDate: this.startDate,
            endDate: this.endDate,
            sortMethod: this.sortMethod
        })
    }

    @Output() filterChanged = new EventEmitter<FilterData>();


}
