import { RoleGuard } from './services/role.guard';
import { AuthGuard } from './services/auth.guard';
import { IndexComponent } from './client/index/index.component';
import { NotFoundComponent } from './client/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerRegistrationComponent } from './client/customer-registration/customer-registration.component';

const routes: Routes = [
  //admin

  // {path: 'admin', pathMatch: 'full', component: AdminListComponent},
  // {path: '', loadChildren:() => import('./login/login.module').then(x => x.LoginModule) },
  // {path: 'home', loadChildren: () => import('./main/main.module').then(x => x.MainModule)}
  {path: '', redirectTo:'/client', pathMatch: 'full'},
  {path: 'client',loadChildren: () => import('./client/client.module').then(x => x.ClientModule)},

  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule), canActivate: [AuthGuard, RoleGuard]},

  {path: 'login', loadChildren: () => import('./login/login.module').then(x => x.LoginModule)},
  
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
