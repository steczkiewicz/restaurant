import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { Dish } from '../shared/dish.model';
import { DishesService } from '../services/dishes.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  fetchedDishes: Dish[] = [];
  constructor(public dishesService: DishesService,
     public currencyService: CurrencyService,
     private shoppingCartService: ShoppingCartService,
     private router: Router,
     public authService: AuthService) { 
     }
  

  ngOnInit(): void {
    this.fetchedDishes = this.dishesService.firebaseDishes;
  }

  onAddToCart(item:Dish) {
    this.shoppingCartService.addItemToCart(item);
  }

  onRemoveFromCart(item:Dish) {
    this.shoppingCartService.removeItemFromCart(item);
  }

  onToEditMode() {
    this.router.navigate(['editmode']);
  }
}
