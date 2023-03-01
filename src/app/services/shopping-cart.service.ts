import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish.model";
import { AuthService } from "./auth.service"

@Injectable({providedIn: 'root'})
export class ShoppingCartService {
    items: Map <Dish,number> = new Map();
    sumOfProducts: number = 0;

    constructor(private authService: AuthService) { }

    addItemToCart(item: Dish) {
        if (this.authService.isLoggedIn()) {
            if ((this.items.has(item) && this.items.get(item) as number < item.quantity) || !this.items.has(item)) {
            this.sumOfProducts += item.price;
            this.items.set(item,(this.items.get(item) ?? 0) + 1);
        }
        }
    }

    removeItemFromCart(item: Dish) {
        if (this.authService.isLoggedIn()) {
            if (this.items.has(item)) {
                this.sumOfProducts -= item.price;
                this.items.set(item,(this.items.get(item)??0) - 1);
                if (this.items.get(item) === 0) {
                    this.items.delete(item);
                }
            }
        }
    }
}