import { Injectable } from "@angular/core";
import { Item } from "../../../../shared/interfaces";

@Injectable()
export class CartService {
    private _cart: Item[] = [];

    constructor() { }

    get cart() {
        return this._cart;
    }

    addToCart(item: Item) {
        this._cart.push(item);
    }

    removeFromCart(item: Item) {
        this._cart = this._cart.filter(i => i !== item)
    }
}