import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../../../../shared/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() cart: Item[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  removeFromCart(itemToRemove: Item) {
    this.cart = this.cart.filter(item => item !== itemToRemove)
  }
}
