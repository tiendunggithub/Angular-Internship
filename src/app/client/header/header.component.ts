import { Cart } from 'src/app/models/cart';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from './../../services/customer.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  wellcomeName = "";
  categoryList : any;
  productsList:any;
  cartObj: Cart[]=[];
  leCart: number=0;

  constructor(private router: Router, 
    private customerService: CustomerService, 
    private categoryService: CategoryService,
    private productService: ProductService) {
    // let request = {};
    //   this.customerService.postRequest(request).subscribe(data=>{
    //     console.log("test", data);
    //   }, error=>{
    //     alert("Server connection error "+error);
    //   })
   }

  ngOnInit(): void {
    this.isLogin = this.customerService.isLoggedIn();
    this.wellcomeName = this.customerService.getLoginDataByKey("full_name");
    this.getAllCategory();
    this.getCartDetailsByUser();
  }

  admin(){
    this.router.navigate[('admin')];
  }
  category_list(){
    this.router.navigate[('category-list')];
  }
  getAllCategory(){
    this.categoryService.getCategoryList().subscribe(data=>{
      console.log("data: " + data);
      this.categoryList = data;
    }, error=>{
      console.log(error)
    })
  }
  logout(){
    this.customerService.logout();
    this.isLogin = false;
  }

  getProductsByCategory(obj){
    let request ={
      "cate_id":obj.id
    }
   this.productService.getProductByCategory(request).subscribe(data=>{
      this.productsList = data;
      console.log(data);
      if(this.productsList.length == 0){
        alert("No Product is found..");
      }
   })
  }

  getCartDetailsByUser(){
    this.customerService.requestWithToken("cart/getCart",{}).subscribe((data:any)=>{
      this.cartObj = data;
      if(this.cartObj.length<1){
        this.leCart= this.cartObj.length;
        console.log("leCart: "+this.leCart);
        // alert("Giỏ hàng trống!!!")
      }
    })
  }

  // loginCheckUser(){
  //   let request = {
  //     "email": this.email,
  //     "password": this.password
  //   }
  //   this.customerService.loginRequest(request).subscribe(data=>{
  //     if(data.hasOwnProperty("token")){
  //       this.customerService.setLoginToken(data['token']);
  //       this.isLogin = true;
  //     }
  //   },error=>{
  //     alert("Error in login"+error);
  //   })
  // }

  // registerUser(){
  //   let request = {
  //     "full_name": "",
  //     "email": this.email,
  //     "password": this.password,
  //     "phone": "",
  //     "address": ""
  //   }
  //   this.customerService.loginRequest(request).subscribe(data=>{
  //     if(data.hasOwnProperty("token")){
  //       this.customerService.setLoginToken(data['token']);
  //       this.isLogin = true;
  //     }
  //   },error=>{
  //     alert("Error in login"+error);
  //   })
  // }

  // getLogin(){
  //   return localStorage.getItem("email");
  // }
  // isLogin(){
  //   try{
  //     if(this.getLogin() != ""){
  //       return true;
  //     }
  //   }catch{

  //   }
  //   return false;
  // }

}
