import { Injectable } from "@angular/core";
import { Dish } from "../shared/dish.model";
import { Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class DishesService {
  firebaseDishes: Dish[] = [];
  constructor(private firestore: Firestore,
    private authService: AuthService) {
    this.getDishes();
  }

  async getDishes() {
    const q = query(collection(this.firestore,'dishes'));
    const qSnapshot = await getDocs(q);
    qSnapshot.forEach((doc) => {
      const nDish: Dish = {
        dish_name: doc.data()["dish_name"],
        category: doc.data()["category"],
        cuisine: doc.data()["cuisine"],
        description: doc.data()["description"],
        image: doc.data()["image"],
        ingredients: doc.data()["ingredients"],
        price: doc.data()["price"],
        quantity: doc.data()["quantity"],
        id: doc.id
      }
      this.firebaseDishes.push(nDish)
    })
  }

  addNewDish(newDish: Dish) {
    if (this.authService.isManagerOrAdmin()) {
      addDoc(collection(this.firestore,'dishes'), {
        category: newDish.category,
        cuisine: newDish.cuisine,
        description: newDish.description,
        dish_name: newDish.dish_name,
        image: newDish.image,
        ingredients: newDish.ingredients,
        price: newDish.price,
        quantity: newDish.quantity
      })
      this.firebaseDishes.push(newDish)
    } 
  }

  removeDish(dish: Dish) {
    if (this.authService.isManagerOrAdmin()) {
      this.firebaseDishes.splice(this.firebaseDishes.indexOf(dish),1);
      deleteDoc(doc(this.firestore,'dishes',dish.id))
    }
  }

  getDishById(id: string) {
    let dishToReturn: Dish = {
      dish_name: "NOT_FOUND",
      category: "NOT_FOUND",
      cuisine: "NOT_FOUND",
      description: "NOT_FOUND",
      image: "NOT_FOUND",
      ingredients: "NOT_FOUND",
      price: 0,
      quantity: 0,
      id: "NOT_FOUND"
    };
    for (let dish of this.firebaseDishes) {
      if (dish.id == id) {
        dishToReturn = dish;
      }
    }
    return dishToReturn;
  }
}