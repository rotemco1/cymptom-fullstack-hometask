import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Item } from "../../../../shared/interfaces";

@Injectable()
export class ShopService {
    private _items: Item[] = [];
    constructor() {}

    get items(): Item[] {
        return this._items;
    }

    set items(items: Item[]) {
        this._items.concat(items);
    }

    getItemsByOffset(limit: number, offset: number): Item[] {
        return this._items.slice(offset, limit);
    }
}