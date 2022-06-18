import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../../../shared/interfaces';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input()
  items: Item[] = [];

  @Output()
  filteredItems: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  selectedItem: EventEmitter<Item> = new EventEmitter<Item>();

  filterText = '';
  focusedIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("document:keyup", ["$event"])
  checkNavigation(event: KeyboardEvent): void {
    if (event.code === "ArrowUp" && this.focusedIndex > 0) this.focusedIndex--;
    else if (event.code === "ArrowDown" && this.focusedIndex < this.items.length - 1) this.focusedIndex++;
    else if (event.code === "Enter" || event.code ==="NumpadEnter") this.onSelect(this.items[this.focusedIndex]);
    else if (event.code === "Escape") this.resetSearch();
    else {
      this.focusedIndex = 0;
      this.fetchFilteredItems();
    }
  }

  resetSearch() {
    this.filterText = '';
    this.focusedIndex = 0;
  }

  fetchFilteredItems(): void {
    this.filteredItems.emit(this.filterText);
  }

  onSelect(selectedItem: Item) {
    this.selectedItem.emit(selectedItem)
  }
}
