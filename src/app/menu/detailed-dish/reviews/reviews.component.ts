import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Dish } from 'src/app/shared/dish.model';
import { Review } from 'src/app/shared/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;
  reviews: Review[] = [];
  @Input() dish!: Dish;
  
  constructor(private formBuilder: FormBuilder,private authService: AuthService,private shoppingCart: ShoppingCartService) {
      this.formErrors = new Map([
        ['nick', ''],
        ['name', ''],
        ['review', '']
      ]);

      this.validationMessages = new Map([
        ['name', new Map([['required', 'name cannot be blank']])],
        ['review', new Map([['required', 'review cannot be blank']])],
      ]);
    }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['',Validators.required],
      review: ['',Validators.required],
      date: ['']
    });
    
    this.modelForm.valueChanges
    .subscribe((value) => {
      this.onControlValueChanged();
    })
    this.onControlValueChanged();
  }

  onSubmit(form: FormGroup) {
    const newReview: Review = {
        nick: this.authService.user.username,
        name: form.value.name,
        review: form.value.review,
        date: form.value.date
    }
    if (form.valid && this.authService.user.role !== 'guest' && this.authService.user.isBanned === false && this.shoppingCart.items.get(this.dish) !== undefined) {
      this.reviews.push(newReview);
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
