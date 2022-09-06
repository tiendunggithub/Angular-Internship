import { AdminService } from './../../services/admin.service';
import { CustomerService } from './../../services/customer.service';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProduct: number = 0;
  totalCustomer: number = 0;
  totalAdmin: number = 0;

  constructor(private productService: ProductService,
    private customerService: CustomerService,
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct({});
    this.getCustomers({});
    this.getAdmins({});
  }

  private getAllProduct(request){
    this.productService.pageProduct(request)
      .subscribe(data => {
        this.totalProduct = data['totalElements'];
      });
  }

  private getCustomers(request){
    this.customerService.getListCustomer(request).subscribe(data => {
      console.log(data);
      this.totalCustomer = data['totalElements'];
    })
  }

  private getAdmins(request){
    this.adminService.pageAdmin(request).subscribe(data => {
      this.totalAdmin = data['totalElements'];
    });
  }
}
