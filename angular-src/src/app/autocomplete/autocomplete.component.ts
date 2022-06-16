import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  items = [{
    id: 1,
    name: "shirt"
  },{
    id: 2,
    name: "jeans"
  },{
    id: 3,
    name: "dress"
  }];

  cart: {id: number, name: string}[] = [];
  filterText= '';

  constructor() { }

  ngOnInit(): void {
  }

}
