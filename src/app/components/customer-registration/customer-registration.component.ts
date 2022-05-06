import { Customer } from './../../models/customer';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['customer/login']);
  }
  
  registration(){
    this.customerService.registration(this.customer).subscribe(data=>{
      console.log(data);
      this.toastr.success('Đăng ký thành công!', 'Thông báo');
    },error=>{
      console.log(error);
      this.toastr.error('Đăng ký không thành công!', 'Thông báo');
    });
  }
}
