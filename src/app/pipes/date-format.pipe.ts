import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const datePipe: DatePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'dd/MM/yyyy HH:mm', 'UTC');

    return formattedDate;
  }
}
