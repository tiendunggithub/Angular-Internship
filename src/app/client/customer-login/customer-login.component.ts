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

  isLogin = false;


  customer: Customer = new Customer();
  constructor(private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService) { }
  ngOnInit(): void {
  }

  loginRequest(){
    let request = {
      "email": this.customer.email,
      "password": this.customer.password      
    }
    this.customerService.loginRequest(request).subscribe(data=>{
      console.log("Token: ", data['token']);
      if(data.hasOwnProperty("token")){
        this.customerService.setLoginToken(data['token']);
        this.customerService.setLoginData(data);
        console.log(data);
        // this.router.navigate(['/client'])
        this.toastr.success('Đăng nhập thành công', 'Thông báo')
        
        window.location.href="/client"
      }
    }, error=>this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!!!', 'Đăng nhập thất bại'));

  }
  goToAdminList(){
    this.router.navigate(['client']);
  }

  // loginCustomer(){
  //   this.customerService.login(this.customer).subscribe(data=>{
  //     this.goToAdminList();
  //     this.toastr.success('Đăng nhập thành công', 'Thông báo')
  //   }, error=>this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!!!', 'Đăng nhập thất bại'));
  // }

  goToRegistration(){
    this.router.navigate(['client/customer-registration']);
  }

  // loginCheckUser(){
  //   let request = {
  //     "email": this.customer.email,
  //     "password": this.customer.password      
  //   }
  //   this.customerService.loginRequest(request).subscribe(data=>{
  //     console.log("token == ", data['token'])
  //     if(data.hasOwnProperty("token")){
  //       this.customerService.setLoginToken(data['token']);
  //       this.isLogin = true;
  //     }
  //   },error=>{
  //     alert("Error in login"+error);
  //     console.log("request == ", request);
  //   });
  // }
}
