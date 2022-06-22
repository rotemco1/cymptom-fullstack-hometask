import { Injectable } from "@angular/core";
import { Item } from "../../../../shared/interfaces";

@Injectable()
export class CartService {
    private _cart: Item[] = [];
    private _totalPrice = 0;

    constructor() { }

    get cart(): Item[] {
        return this._cart;
    }

    get totalPrice(): number {
        return +this._totalPrice.toFixed(2);
    }

    addToCart(item: Item) {
        this._cart.push(item);
        this._totalPrice += item.price;
    }

    removeFromCart(item: Item) {
        // For removing only one instance of this item
        const itemIndex = this._cart.indexOf(item);
        if (itemIndex > -1)
            this._cart.splice(itemIndex, 1);
        this._totalPrice -= item.price;
    }
}