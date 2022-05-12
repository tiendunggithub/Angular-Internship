import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  customer: Customer = new Customer();
  constructor(private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  goToAdminList(){
    this.router.navigate(['admin']);
  }

  loginCustomer(){
    this.customerService.login(this.customer).subscribe(data=>{
      this.goToAdminList();
      this.toastr.success('Đăng nhập thành công', 'Thông báo')
    }, error=>this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!!!', 'Đăng nhập thất bại'));
  }

  goToRegistration(){
    this.router.navigate(['customer/registration']);
  }
}
