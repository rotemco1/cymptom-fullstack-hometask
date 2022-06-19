import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
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
  rowHeight: number = 30;

  @Output()
  filteredItems: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  selectedItem: EventEmitter<Item> = new EventEmitter<Item>();

  @ViewChild('autocompleteList')
  autocompleteList: any;

  itemsInView: Item[] = [];
  startIndex: number = 0;
  endIndex: number = 0;
  filterText: string = '';
  focusedIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.render();
  }

  ngOnChanges(): void {
    this.render();
  }

  render(): void {
    let scrollTop = this.autocompleteList?.nativeElement.scrollTop;
    let height = this.autocompleteList?.nativeElement.clientHeight;
    this.startIndex = Math.floor(scrollTop / this.rowHeight);
    this.endIndex = Math.ceil((scrollTop + height) / this.rowHeight);
    if (this.items) {
      this.itemsInView = this.items.slice(this.startIndex, this.endIndex);
    }
  }

  @HostListener("document:keyup", ["$event"])
  checkNavigation(event: KeyboardEvent): void {
    this.render();
    if (event.code === "ArrowUp" && this.focusedIndex > 0) this.focusedIndex--;
    else if (event.code === "ArrowDown" && this.focusedIndex < this.items.length - 1) this.focusedIndex++;
    else if (event.code === "Enter" || event.code === "NumpadEnter") this.onSelect(this.items[this.focusedIndex]);
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
