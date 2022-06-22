import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip, switchMap, takeUntil } from 'rxjs/operators';
import { Item } from '../../../../shared/interfaces';
import { CartService } from '../services/cart.service';
import { ShopApiService } from '../services/shop-api.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  // searchedItems$ = new BehaviorSubject('');
  // filteredItems$: Observable<Item[]> = new Observable<Item[]>;

  filteredItems: Item[] = [];

  constructor(private readonly shopApiService: ShopApiService,
    public readonly shopService: ShopService,
    private readonly cartService: CartService) { }

  ngOnInit(): void {
  }

  get items(): Item[] {
    return this.filteredItems;
  }

  async fetchItemsByFilter(event: { filterText: string, limit: number, offset: number }): Promise<void> {
    if (event.offset === 0) this.filteredItems = [];
    if (event.filterText) {
      // TODO: add limit and offset from autocomplete scroll
      this.shopApiService.getItemsByFilter(event.filterText, event.limit, event.offset)
        .toPromise().then(items => this.filteredItems = this.filteredItems.concat(items));

      // this.searchedItems$.next(filter);
      // this.filteredItems$ = this.searchedItems$.pipe(
      //   // For unsubscribe the previous observable
      //   switchMap(() =>
      //     this.shopApiService.getItemsByFilter(filter)
      //       .pipe(
      //         // For completeing the observable at the time we get new filter input
      //         takeUntil(
      //           // For "skiping" the last value of our searchedItems$ observable
      //           this.searchedItems$.pipe(skip(1))
      //         )
      //       )
      //   )
      // );
    }
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item);
  }

  ngOnDestroy(): void {
    // this.searchedItems$.unsubscribe();
  }
}
