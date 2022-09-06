import { AdminService } from './admin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
constructor(private adminService: AdminService, private router: Router){}

  canActivate(){
    if(this.adminService.HaveAccess()){
      return true;
    }
    this.router.navigate([''])
    return false;
  }
  
}
