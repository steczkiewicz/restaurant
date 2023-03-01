import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
import { DishesService } from '../services/dishes.service';
import { Dish } from '../shared/dish.model';

@Component({
  selector: 'app-edit-mode',
  templateUrl: './edit-mode.component.html',
  styleUrls: ['./edit-mode.component.css']
})
export class EditModeComponent implements OnInit {
  fetchedDishes: Dish[] = [];
  constructor(private router: Router,
    private dishesService: DishesService,
    public currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.fetchedDishes = this.dishesService.firebaseDishes;
  }

  onToAddDish() {
    this.router.navigate(['newdish']);
  }

  onRemoveDish(dish: Dish) {
    this.dishesService.removeDish(dish);
  }

  onBack() {
    this.router.navigate(['menu']);
  }

}
