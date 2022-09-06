import { AdminService } from './../../services/admin.service';
import { CustomerService } from './../../services/customer.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false
  wellcomeName = "";
  constructor(private router: Router, private adminService: AdminService) { 
      
  }

  ngOnInit(): void {
    this.isLogin = this.adminService.isLoggedIn();
    this.wellcomeName = this.adminService.getLoginDataByKey("full_name");
  }

  logout(){
    this.adminService.logout();
    this.isLogin = false;
    location.reload();
    
  }
}
