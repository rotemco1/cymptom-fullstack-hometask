import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../shared/interfaces'

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

  cart: Item[] = [];
  filterText = '';

  constructor() { }

  ngOnInit(): void {
  }

  fetchFilteredItems(): void {
    this.filteredItems.emit(this.filterText);
  }

}
