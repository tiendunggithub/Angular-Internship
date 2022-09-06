import { AdminService } from './admin.service';
import { CustomerService } from './customer.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private customerService: CustomerService, private adminService: AdminService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.adminService.isLoggedIn()){
      return true;
    }
    // alert('Token không hợp lệ')
    this.router.navigate(['login'])
    return false;
  }
  
}
