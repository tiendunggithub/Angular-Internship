import { CustomerService } from './../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Admin } from './../models/admin';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  admin: Admin = new Admin();

  constructor(private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  goToAdminList(){
    this.router.navigate(['admin']);
  }
  
  loginAdmin(){
    this.adminService.loginAdmin(this.admin).subscribe(data=>{
      this.goToAdminList();
      this.toastr.success('Đăng nhập thành công', 'Thông báo')
    }, error=>this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!!!', 'Đăng nhập thất bại'));
  }

  loginRequestAdmin(){
    let request = {
      "username": this.admin.username,
      "pass": this.admin.pass      
    }
    console.log("request: ",request);
    this.adminService.loginRequest(request).subscribe(data=>{
      console.log("Token: ", data['token']);
      if(data.hasOwnProperty("token")){
        this.adminService.setLoginToken(data['token']);
        this.adminService.setLoginData(data);
        console.log(data)
        this.router.navigate(['/admin'])
        this.toastr.success('Đăng nhập thành công', 'Thông báo');
        // window.location.href="/admin"
      }
    }, error=>{
      this.toastr.error('Tên đăng nhập hoặc mật khẩu không đúng!!!', 'Đăng nhập thất bại');
      console.log("loi: ", error);
    });

  }

}
