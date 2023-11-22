import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {

  dynamicSearch: string[] = [];

  constructor(private sharedService: SharedService) {
    this.sharedService.searchOptions$.subscribe((options) => {
      this.dynamicSearch.push(options);
      this.sharedService.setDynamicSearch(this.dynamicSearch);
    });
  }

  onChipClick(search: string) {
    this.sharedService.onSearchTriggered(search);
  }

  clearChips() {
    this.dynamicSearch = [];
    this.sharedService.setDynamicSearch([]);
    this.sharedService.clearChips();
  }
}
