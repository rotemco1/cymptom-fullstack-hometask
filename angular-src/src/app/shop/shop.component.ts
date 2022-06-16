import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Item } from '../../../../shared/interfaces';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private readonly shopService: ShopService) { }

  filteredItems$: Observable<Item[]> = new Observable<Item[]>;
  ngOnInit(): void {
  }

  fetchItemsByFilter(filter: string): void {
    this.filteredItems$ = this.shopService.getItemsByFilter(filter);
  }

}
