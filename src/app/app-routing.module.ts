import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerRegistrationComponent } from './components/customer-registration/customer-registration.component';

const routes: Routes = [
  //admin

  // {path: 'admin', pathMatch: 'full', component: AdminListComponent},
  // {path: '', loadChildren:() => import('./login/login.module').then(x => x.LoginModule) },
  // {path: 'home', loadChildren: () => import('./main/main.module').then(x => x.MainModule)}
  {path: 'customer/login', component: CustomerLoginComponent },
  {path: 'customer/registration', component: CustomerRegistrationComponent },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
