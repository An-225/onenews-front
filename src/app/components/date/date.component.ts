import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {
  @Output() rangeSelected = new EventEmitter<any>();
}
