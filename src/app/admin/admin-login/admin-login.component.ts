import { ToastrService } from 'ngx-toastr';
import { Admin } from '../../models/admin';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin: Admin = new Admin();

  constructor(private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService) { }

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
}
