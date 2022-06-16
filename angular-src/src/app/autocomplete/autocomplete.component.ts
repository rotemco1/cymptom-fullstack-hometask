import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../../shared/interfaces'

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input()
  readonly items: Item[] = []

  cart: Item[] = [];
  filterText = '';

  constructor() { }

  ngOnInit(): void {
  }

}
