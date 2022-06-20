import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
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
  autocompleteList!: ElementRef;

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

  // Filtering the items array we want to render and show by any change caused by the user
  // Changes as: scrolling, navigation keys, new filter text, etc... which may affect the items we want to show
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
    if (event.code === "ArrowDown") {
      // In case this isn't the last item to show update the scrollTop for render next (rowHeight) new items
      if (this.items[this.items.length - 1].sku !== this.itemsInView[this.itemsInView.length - 1].sku)
        this.autocompleteList.nativeElement.scrollTop += this.rowHeight;
      // For navigation down to the last items to show
      else if (this.focusedIndex < this.itemsInView.length - 1) this.focusedIndex++;
    }
    else if (event.code === "ArrowUp") {
      // In case this isn't the first item to show update the scrollTop for render previous (rowHeight) new items
      if (this.autocompleteList.nativeElement.scrollTop > 0)
        this.autocompleteList.nativeElement.scrollTop -= this.rowHeight;
      // For navigation up to the first items to show
      else if (this.focusedIndex > this.startIndex) this.focusedIndex--;
    }
    else if (event.code === "Enter" || event.code === "NumpadEnter") this.onSelect(this.itemsInView[this.focusedIndex]);
    else if (event.code === "Escape") this.resetSearch();
    else {
      this.focusedIndex = 0;
      this.fetchFilteredItems();
    }
    this.render();
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
