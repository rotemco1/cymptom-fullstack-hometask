import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../../shared/interfaces';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Item[] = [];

  constructor(public readonly cartService: CartService) { }

  ngOnInit(): void {
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
  }
}
