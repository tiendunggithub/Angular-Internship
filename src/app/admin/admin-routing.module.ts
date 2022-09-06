import { AdminComponent } from './admin.component';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from '../client/not-found/not-found.component';



const routes: Routes = [

  {
    path: '', component: AdminComponent, 
    children: [
      // {path: '', redirectTo:'/admin/list', pathMatch:'full'},
      {path: '', redirectTo:'/admin/dashboard', pathMatch:'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'list', component: AdminListComponent},
      {path: 'admin-form', component: AdminFormComponent },
      {path: 'admin-form/:id', component: AdminFormComponent },
      //loginAdmin
      {path: 'login', component: AdminLoginComponent },
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
      {path: 'customer', component: CustomerListComponent },
      {path: 'customer/details/:id', component: CustomerDetailsComponent },
    ]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
export class AdminRoutingModule{}