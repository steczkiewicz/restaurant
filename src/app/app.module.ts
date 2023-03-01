import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NewDishComponent } from './edit-mode/new-dish/new-dish.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FiltersComponent } from './filters/filters.component';
import { DetailedDishComponent } from './menu/detailed-dish/detailed-dish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsComponent } from './menu/detailed-dish/reviews/reviews.component';
import { HttpClientModule } from '@angular/common/http'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore,enableIndexedDbPersistence } from '@angular/fire/firestore'
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditModeComponent } from './edit-mode/edit-mode.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    NewDishComponent,
    ShoppingCartComponent,
    HomeComponent,
    LoginComponent,
    FiltersComponent,
    DetailedDishComponent,
    ReviewsComponent,
    FooterComponent,
    RegisterComponent,
    AdminPanelComponent,
    EditModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAwmehcXw9XnIs4SKf-FY2ABBP0fvYP8mE",
      authDomain: "restaurant-61041.firebaseapp.com",
      projectId: "restaurant-61041",
      storageBucket: "restaurant-61041.appspot.com",
      messagingSenderId: "319179755096",
      appId: "1:319179755096:web:9dd893848d7c923ab5c42d",
      measurementId: "G-9T18MH6ZYT"
    })),
      provideAuth(() => {
        const auth = getAuth();
        return auth;
      }),
        provideFirestore(() => {
            const firestore = getFirestore();
            enableIndexedDbPersistence(firestore);
            return firestore; 
        }),
        provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
