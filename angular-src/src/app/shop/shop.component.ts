import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, takeUntil, skip } from 'rxjs/operators'
import { Item } from '../../../../shared/interfaces';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  searchedItems$ = new BehaviorSubject('');
  filteredItems$: Observable<Item[]> = new Observable<Item[]>;

  constructor(private readonly shopService: ShopService) { }

  ngOnInit(): void {
  }

  fetchItemsByFilter(filter: string): void {
    this.searchedItems$.next(filter);
    this.filteredItems$ = this.searchedItems$.pipe(
      switchMap(() =>
        this.shopService.getItemsByFilter(filter)
          .pipe(
            takeUntil(
              this.searchedItems$.pipe(skip(1))
            )
          )
      )
    );
  }

  addToCart(item: Item) {

  }
}
