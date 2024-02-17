import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.css']
})
export class DateComponent {
    range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
    });

    handleDateSelect() {
        this.rangeSelected.emit(this.range)
    }

    @Output() rangeSelected = new EventEmitter<FormGroup<{
        start: FormControl<Date | null>,
        end: FormControl<Date | null>
    }>>();
}
