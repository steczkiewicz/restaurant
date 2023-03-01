import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Dish } from '../shared/dish.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: Map<Dish,number>;
  value: number;

  constructor(public shoppingCartService: ShoppingCartService, public currencyService: CurrencyService) {
    this.products = this.shoppingCartService.items;
    this.value = this.shoppingCartService.sumOfProducts;
  }

  ngOnInit(): void {
    
  }

}
