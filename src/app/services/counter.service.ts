import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {
    counter = 0;

    incrementCounter() {
        this.counter += 1;
    }

    decrementCounter() {
        this.counter -= 1;
    }
}