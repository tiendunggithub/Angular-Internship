import { Role } from './../../models/role';
import { AdminService } from './../../services/admin.service';
import { Admin } from './../../models/admin';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  admin: Admin = new Admin();
  roles: Role[] = [];

  constructor(private adminService: AdminService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.adminService.getRoles()
        .subscribe(response => this.roles = response);
        
    this.activatedRouter.params
        .subscribe(params => {
          let id: number = params['id'];
          if(id){
            this.adminService.getAdmin(id)                
                .subscribe(response => this.admin = response);
          }
        })
  }

  goToAdminList(){
    this.router.navigate(['admin']);
  }

  saveAdmin(){
    this.adminService.createAdmin(this.admin)
        .subscribe(response => {
          this.goToAdminList();
        }, 
        error => console.log(error));
  }

  updateAdmin(){
    this.adminService.updateAdmin(this.admin)
        .subscribe(response =>{
          this.goToAdminList();
        },
        error => console.log(error));
  }

  comparativeRole(o1: Role, o2: Role): boolean{
    if(o1 == undefined && o2 == undefined){
      return true;
    }
    return o1 == null || o2 == null || o1 == undefined || o2 == undefined ? false: o1.id == o2.id;
  }

  search(){

  }
}
