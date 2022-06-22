import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item } from '../../../../../../shared/interfaces';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnChanges {

  @Input()
  items: Item[] = [];

  @Input()
  numItemsToShow: number = 20;

  @Output()
  filteredItems: EventEmitter<{ filterText: string, limit: number, offset: number }> = new EventEmitter<{ filterText: string, limit: number, offset: number }>();

  @Output()
  selectedItem: EventEmitter<Item> = new EventEmitter<Item>();

  filterText: string = '';
  focusedIndex: number = 0;
  offset = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.items);
  }

  @HostListener("document:keyup", ["$event"])
  checkNavigation(event: KeyboardEvent): void {
    if (event.code === "ArrowUp" && this.focusedIndex > 0) this.focusedIndex--;
    else if (event.code === "ArrowDown" && this.focusedIndex < this.items.length - 1) this.focusedIndex++;
    else if (event.code === "Enter" || event.code === "NumpadEnter") {
      console.log(this.focusedIndex);
      this.items[this.focusedIndex];
      this.onSelect(this.items[this.focusedIndex]);
    }
    else if (event.code === "Escape") {
      this.filterText = '';
      this.resetSearch();
    }
    else {
      this.focusedIndex = 0;
      this.fetchFilteredItems();
    }
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.loadMoreItems();
    }
  }

  loadMoreItems() {
    this.offset += this.numItemsToShow;
    this.fetchFilteredItems();
  }

  resetSearch() {
    this.focusedIndex = 0;
    this.offset = 0;
    this.fetchFilteredItems();
  }

  fetchFilteredItems(): void {
    this.filteredItems.emit({ filterText: this.filterText, limit: this.numItemsToShow, offset: this.offset });
  }

  onSelect(selectedItem: Item) {
    this.selectedItem.emit(selectedItem);
  }
}
