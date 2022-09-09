import { CheckoutComponent } from './checkout/checkout.component';
import { ProductListComponent } from './../client/product-list/product-list.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ClientComponent } from './client.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      // {path: '', redirectTo:'/client/home', pathMatch: 'full'},
      {path: '', component: IndexComponent},
      {path: 'cart', component: CartComponent},
      {path: 'product', component: ProductListComponent},
      {path: 'product/:id', component: ProductListComponent},
      {path: 'customer-login', component: CustomerLoginComponent},
      {path: 'customer-registration', component: CustomerRegistrationComponent},
      {path: 'checkout', component: CheckoutComponent} 
    ] 
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
