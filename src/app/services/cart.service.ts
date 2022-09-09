import { CustomerService } from './customer.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { AdminService } from './admin.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartQty = 0;
  cartObj: Cart[]=[];
  public cartTotalPrice: any;

  private baseURL = "http://localhost:8080/api/v1/cart";

  public cartServiceEvent = new BehaviorSubject({});

  constructor(private httpClient: CustomerService, private toastr: ToastrService) {
    this.getCartDetailsByUser();
   }

  getCartDetailsByUser(){
    return this.httpClient.requestWithToken("cart/getCart",{}).subscribe((data:any)=>{

      this.cartObj = data;
      this.cartQty = data.length;
    //  this.cartTotalPrice = this.getTotalAmounOfTheCart();
      this.cartServiceEvent.next({"status":"completed"})//emitter
    }, error=>{
      console.log(error)
    })
  }
  

  addCart(obj){
    //this.cartServiceEvent.next({"status":"completed"})//emitter
    
    var request  = {
      "prodId":obj.productId,
      "qty":obj.qty,
      "price":obj.price,
      "promotion":obj.promotion
    }
    console.log("promotion: "+ obj.promotion)
    console.log("price: "+ obj.price)
    this.httpClient.requestWithToken("cart/addProduct",request).subscribe((data:any)=>{
      this.getCartDetailsByUser()
      this.toastr.success("Thêm vào giỏ hàng thành công")
    },
    error=>{
      //if the products is already in cart
      console.log(error)
    })
  }

  getTotalAmounOfTheCart(){
    let obj = this.cartObj;
    let totalPrice  = 0;
   
    for(var o in obj ){      
      totalPrice = totalPrice +parseFloat(obj[o].promotion);
    }
    console.log("TotalPrice Service: "+totalPrice)
    return totalPrice.toFixed(0);
  }

  getQty(){
    return this.cartQty;
  }

  getCartOBj(){
    return this.cartObj;
  }
    
  
  // }
  // getCart(): Observable<Cart[]>{
  //   return this.httpClient.get<Cart[]>(`${this.baseURL+'/getCart'}`);
  // }
}
