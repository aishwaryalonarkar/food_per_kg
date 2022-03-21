import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import {MainComponent} from './modules/main/main.component';
import {CartComponent} from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { HomeComponent } from './modules/home/home.component';
import { MenuHeaderComponent } from './modules/menu-header/menu-header.component';


const routes: Routes = [
  {
    path:'',
    component:DefaultComponent,
    children:[
      {
        path:'',
        component:MainComponent
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path:'checkout',
        component:CheckoutComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'head',
        component:MenuHeaderComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
