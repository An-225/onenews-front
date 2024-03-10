import {Component, EventEmitter, Output} from "@angular/core";

@Component({
    selector: 'sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css']
})
export class SortComponent {
    selected = "relevancy"

    handleMethodSelect() {
        this.sortMethod.emit(this.selected)
    }

    @Output() sortMethod = new EventEmitter<String>();
}