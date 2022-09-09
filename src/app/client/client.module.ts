import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';

import { ToastrModule } from 'ngx-toastr';
import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { CartComponent } from './cart/cart.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { ClientComponent } from './client.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    CartComponent,
    CustomerLoginComponent,
    CustomerRegistrationComponent,
    ClientComponent,
    ScrollTopComponent,
    ProductListComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
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
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatBadgeModule,
    ToastrModule
  ]
})
export class ClientModule { }
