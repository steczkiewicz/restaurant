import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';
import { Dish } from 'src/app/shared/dish.model';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-detailed-dish',
  templateUrl: './detailed-dish.component.html',
  styleUrls: ['./detailed-dish.component.css']
})
export class DetailedDishComponent implements OnInit, OnDestroy {
  dish!: Dish;
  id!: string;

  constructor(public dishesService: DishesService,
              private route: ActivatedRoute,
              private router: Router,
              public currencyService: CurrencyService
              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.dish = this.dishesService.getDishById(this.id);
  }

  ngOnDestroy(): void {
      
  }

  onGoBack() {
    this.router.navigate(['menu'])
  }
}
