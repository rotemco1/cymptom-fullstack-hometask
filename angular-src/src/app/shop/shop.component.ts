import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../shared/interfaces';
import { CartService } from '../services/cart.service';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  filteredItems: Item[] = [];

  constructor(private readonly shopApiService: ShopApiService,
    private readonly cartService: CartService) { }

  ngOnInit(): void {
  }

  async fetchItemsByFilter(event: { filterText: string, limit: number, offset: number }): Promise<void> {
    if (event.offset === 0) this.filteredItems = [];
    if (event.filterText) {
      this.shopApiService.getItemsByFilter(event.filterText, event.limit, event.offset)
        .toPromise().then(items => this.filteredItems = this.filteredItems.concat(items));
    }
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item);
  }
}
