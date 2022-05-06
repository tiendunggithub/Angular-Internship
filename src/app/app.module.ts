import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {MatTableModule} from '@angular/material/table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatDividerModule} from '@angular/material/divider';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CustomerRegistrationComponent } from './components/customer-registration/customer-registration.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { IndexComponent } from './components/index/index.component'

@NgModule({
  declarations: [
    AppComponent,
    AdminListComponent,
    HeaderComponent,
    AdminFormComponent,
    ProductListComponent,
    ProductFormComponent,
    CategoryFormComponent,
    CategoryListComponent,
    ProductDetailsComponent,
    ProductCreateComponent,
    FooterComponent,
    AdminLoginComponent,
    CustomerRegistrationComponent,
    CustomerLoginComponent,
    CustomerDetailsComponent,
    CustomerListComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    Ng2SearchPipeModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
