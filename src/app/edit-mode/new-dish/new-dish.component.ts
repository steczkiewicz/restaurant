import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dish } from 'src/app/shared/dish.model';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.component.html',
  styleUrls: ['./new-dish.component.css']
})
export class NewDishComponent implements OnInit {
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private dishesService: DishesService) {
      this.formErrors = new Map([
        ['name', ''],
        ['ingredients', ''],
        ['image', ''],
        ['price', ''],
        ['quantity', ''],
        ['category', ''],
        ['cuisine', ''],
        ['description','']
      ])

      this.validationMessages = new Map([
        ['name', new Map([['required', 'dish cannot be blank']])],
        ['ingredients', new Map([['required', 'ingredients cannot be blank']])],
        ['image', new Map([['required', 'image cannot be blank']])],
        ['price', new Map([['required', 'price cannot be blank'],
                              ['min', 'minimum price is 1']])],
        ['quantity', new Map([['required', 'quantity cannot be blank'],
                              ['min', 'minimum quantity is 1']])],
        ['category', new Map([['required', 'category cannot be blank']])],
        ['cuisine', new Map([['required', 'cuisine cannot be blank']])],
        ['description', new Map([['required', 'description cannot be blank']])]
      ]);

    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.required],
      image: ['',Validators.required],
      category: ['',Validators.required],
      cuisine: ['',Validators.required],
      description: ['',Validators.required],
      ingredients: ['',Validators.required],
      quantity: ['',Validators.min(1)],
      price: ['',Validators.min(1)]
    });

    this.modelForm.valueChanges
          .subscribe((value) => {
            this.onControlValueChanged();
          })
    this.onControlValueChanged();
  }

  onGoBack() {
    this.router.navigate(['editmode'])
  }

  async onSubmit(form: FormGroup) {
    const newDish: Dish = {
        dish_name: form.value.name,
        image: form.value.image,
        category: form.value.category,
        cuisine: form.value.cuisine,
        description: form.value.description,
        ingredients: form.value.ingredients,
        quantity: form.value.quantity,
        price: form.value.price,
        id: '0'
    }
    if (form.valid) {
      this.dishesService.addNewDish(newDish);
      form.reset();
    } else {
      this.checkValidity('ignore-dirty');
    }
  }

  onControlValueChanged() {    
    this.checkValidity('check-dirty');
  }

  checkValidity(mode:string) {
    const form = this.modelForm;
      for (let [key, value] of this.formErrors) {     
        this.formErrors.set(key, '');
        let control = form.get(key); 
        const modeControl = mode =='check-dirty' ? control?.dirty : true;
        if (control && modeControl && !control.valid) {
          const validationMessages = this.validationMessages.get(key);
          for (const key1 in control.errors) {
            this.formErrors.set(key, validationMessages?.get(key1) + ' ')
          }
        }
      }
  }

}
