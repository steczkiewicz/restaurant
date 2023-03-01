import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DetailedDishComponent } from './menu/detailed-dish/detailed-dish.component';
import { MenuComponent } from './menu/menu.component';
import { NewDishComponent } from './edit-mode/new-dish/new-dish.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ManagerGuard } from './services/manager-guard.service';
import { AdminGuard } from './services/admin-guard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'menu/:id', canActivate:[AuthGuard], component: DetailedDishComponent},
  {path: 'shoppingcart', component: ShoppingCartComponent},
  {path: 'newdish', canActivate: [AuthGuard], component: NewDishComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'adminpanel',canActivate:[AuthGuard,AdminGuard], component: AdminPanelComponent},
  {path: 'editmode', canActivate: [AuthGuard,ManagerGuard], component: EditModeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
