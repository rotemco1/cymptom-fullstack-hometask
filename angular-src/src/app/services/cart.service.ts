import { Injectable } from "@angular/core";
import { Item } from "../../../../shared/interfaces";

@Injectable()
export class CartService {
    private _cart: Item[] = [];
    private _totalPrice = 0;

    constructor() { }

    get cart() {
        return this._cart;
    }

    get totalPrice() {
        return this._totalPrice.toFixed(2);
    }

    addToCart(item: Item) {
        this._cart.push(item);
        this._totalPrice += item.price;
    }

    removeFromCart(item: Item) {
        this._cart = this._cart.filter(i => i !== item);
        this._totalPrice -= item.price;
    }
}