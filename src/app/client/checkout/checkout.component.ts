import { Router } from '@angular/router';
import { Customer } from './../../models/customer';
import { CustomerService } from './../../services/customer.service';
import { Cart } from 'src/app/models/cart';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService,
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService) { }

  cartObj: Cart[]=[];
  customer: Customer = new Customer();
  leCart: any;
  cartTotalPrice :any
  delivery_address = "";
  fullName = "";
  ngOnInit(): void {
    this.getCartDetailsByUser();
    let id : number = this.customerService.getLoginDataByKey("user_id");
    this.customerService.getCustomer(id).subscribe(data=>{
      this.customer = data;
    })
    this.cartService.cartServiceEvent.subscribe(data=>{
      this.cartObj =  this.cartService.getCartOBj();
      this.cartTotalPrice  =  this.cartService.cartTotalPrice;
    });
  }

  checkoutCart(){
    let request =
      {
        "total_price":this.cartTotalPrice,
        "pay_type":"COD",
        "deliveryAddress":this.customer.address
      }    
    this.customerService.requestWithToken("order/checkoutCart",request).subscribe((data:any)=>{
      this.toastr.success("Đặt hàng thành công");
      this.cartService.getCartDetailsByUser();
      this.router.navigate(['/client']);
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

  getDetailsUser(cartObj){
    var request = {
      "id": cartObj.user_id
    }
    this.customerService.requestWithToken("customer/getByCart",request).subscribe((data:any)=>{
      this.customer = data;
    })
  }
}
