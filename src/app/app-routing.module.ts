import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerRegistrationComponent } from './components/customer-registration/customer-registration.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //admin
  {path: 'admin', component: AdminListComponent },
  {path: 'admin/:admin-form', component: AdminFormComponent },
  {path: 'admin/:admin-form/:id', component: AdminFormComponent },
  //loginAdmin
  {path: '', component: AdminLoginComponent },

  //category
  {path: 'category-list', component: CategoryListComponent },
  // product
  {path: 'product', component: ProductListComponent },
  {path: 'product-form', component: ProductFormComponent },
  {path: 'product-create', component: ProductCreateComponent },
  {path: 'product-create/:id', component: ProductCreateComponent },
  {path: 'product-form/:id', component: ProductFormComponent },
  {path: 'product-details/:id', component: ProductDetailsComponent },
  //customer
  {path: 'customer/login', component: CustomerLoginComponent },
  {path: 'customer/registration', component: CustomerRegistrationComponent },
  {path: 'customer', component: CustomerListComponent },
  {path: 'customer/details/:id', component: CustomerDetailsComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
