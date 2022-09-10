import { CustomerService } from './../../services/customer.service';
import { AdminService } from './../../services/admin.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartObj: Cart[]=[];
  leCart: any;
  cartTotalPrice :any
  pay_type = "cash_on_delivery";
  delivery_address = "";

  constructor(private cartService: CartService,
    private customerService: CustomerService,
    private router:Router) { }

  ngOnInit(): void {
    // this.getCarts();
    this.getCartDetailsByUser();
    this.cartService.cartServiceEvent.subscribe(data=>{
      this.cartObj =  this.cartService.getCartOBj();
      this.cartTotalPrice  =  this.cartService.cartTotalPrice;
    });
  }
  getCartDetailsByUser(){
    this.customerService.requestWithToken("cart/getCart",{}).subscribe((data:any)=>{
      this.cartObj = data;
      if(this.cartObj.length<1){
        this.leCart=0;
        // alert("Giỏ hàng trống!!!")
      }
      console.log("cartObj ==> ", data);
      this.cartTotalPrice = this.getTotalAmounOfTheCart();
    })
  }

  getTotalAmounOfTheCart(){
    let obj = this.cartObj;
    let totalPrice  = 0;   
    for(var o in obj ){      
      totalPrice = totalPrice +parseFloat(obj[o].promotion);
    }
    return totalPrice.toFixed(0);
  }

  qtyChange(qty,cartObj){
   var request = {
    "cartId":cartObj.id,
    "qty":qty,
    // "price":(cartObj.price)*(qty),
    "promotion": (cartObj.promotion)*(qty)
  }
    this.customerService.requestWithToken("cart/updateQty",request).subscribe((data:any)=>{
      this.cartService.getCartDetailsByUser(); //for updating in the application..
      this.ngOnInit();
    },error=>{
      alert("Error while fetching the cart Details");
    })
  }

  removeCartById(cartObj){
    if(confirm("Bạn chắc chắn muốn xóa không?")){
      let id  = cartObj.id;
      this.cartService.removeCart(id);
    }    
  }
}
