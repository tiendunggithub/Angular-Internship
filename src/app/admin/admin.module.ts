
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
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
import {MatCheckboxModule} from '@angular/material/checkbox';

import { ToastrModule } from 'ngx-toastr';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderModule } from 'ngx-order-pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        MainComponent,
        AdminComponent,
        AdminListComponent,
        AdminFormComponent,
        AdminLoginComponent,
        CategoryListComponent,
        CategoryFormComponent,
        CustomerListComponent,
        CustomerDetailsComponent,
        FooterComponent,
        HeaderComponent,
        ProductListComponent,
        ProductFormComponent,
        ProductCreateComponent,
        ProductDetailsComponent,
        ProductCreateComponent,
        ConfirmDialogComponent
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
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
        MatCheckboxModule,
        OrderModule,
        ToastrModule.forRoot()
    ],
    providers: [],
    bootstrap: [AdminComponent]
})
export class AdminModule {

}