import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, skip, switchMap, takeUntil } from 'rxjs/operators';
import { Item } from '../../../../shared/interfaces';
import { CartService } from '../services/cart.service';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  searchedItems$ = new BehaviorSubject('');
  filteredItems$: Observable<Item[]> = new Observable<Item[]>;

  constructor(private readonly shopApiService: ShopApiService,
    private readonly cartService: CartService) { }

  ngOnInit(): void {
  }

  fetchItemsByFilter(filter: string): void {
      this.searchedItems$.next(filter);
      this.filteredItems$ = this.searchedItems$.pipe(
        debounceTime(1000),
        switchMap(() =>
          this.shopApiService.getItemsByFilter(filter)
            .pipe(
              takeUntil(
                this.searchedItems$.pipe(skip(1))
              )
            )
        )
      );
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item);
  }

  ngOnDestroy(): void {
    this.searchedItems$.unsubscribe();
  }
}
