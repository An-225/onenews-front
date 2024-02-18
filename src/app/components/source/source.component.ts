import {Component, EventEmitter, Inject, Output} from "@angular/core";
import {MatListOption} from "@angular/material/list";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

export interface SourceDialogData {
    sources: string[],
    selectedSources: string[]
}

@Component({
    selector: 'source',
    templateUrl: './source.component.html',
    styleUrls: ['./source.component.css']
})
export class SourceComponent {
    sources: any[] = []
    selectedSources: string[] = []


    constructor(@Inject(MAT_DIALOG_DATA) public data: SourceDialogData) {
        this.sources = data.sources
        this.selectedSources = data.selectedSources
    }


    handleSourceSelect(selected: MatListOption[]) {
        this.selectedSources = selected.map(value => value.value)
        this.sourcesSelected.emit(this.selectedSources)
    }


    @Output() sourcesSelected = new EventEmitter<string[]>();


}