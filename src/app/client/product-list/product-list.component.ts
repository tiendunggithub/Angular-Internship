import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { CustomerService } from './../../services/customer.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  totalElements: number = 0;
  products: Product[] = [];
  loading: boolean;
  name: any;
  checkSearch = false;
  searchProducts: Product[] = [];
  searchText;
  sizeSearch: number = 0;
  nameProduct;
  productList:any;
  cateList:any;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private router: Router) {  }

  ngOnInit(): void {
    
    this.getAllProduct({});
    // this.productService.getPageProductWithToken(request).subscribe(data=>{
    //   this.productList = data;
    //   if(this.cateList.length > 1)
    //     this.getProductsByCateogy(data[0])
    // },error=>{
    //   alert("Server connection error "+error)
    //   console.log("data", this.productList);
    // })
  }

  addCart(cartProductObj){
    var cartObj = {
      "productId":cartProductObj.id,
      "qty":"1",
      "price":cartProductObj.price,
      "promotion": cartProductObj.promotion
    }
    this.cartService.addCart(cartObj);
  }
  // getProductsByCateogy(obj){
  //   let requestcate ={
  //     "cat_id":obj.id
  //   }
  //   this.productService.getAllCateWithToken(requestcate).subscribe(data=>{
  //     this.productList = data
  //     if(this.productList.length == 0){
  //       alert("No Product is found..");
  //     }
  //  },error=>{
  //    alert("Error in login "+error);
  //  })
  // }
  private getAllProduct(request){
    this.loading = true;
    this.productService.pageProduct(request)
      .subscribe(data => {
        console.log(data);
        this.products = data['content'];
        this.totalElements = data['totalElements'];
        this.loading = false;
      },error =>{
        this.loading = false;
      });
  }
  nextPage(event: PageEvent){
    console.log('event -->', event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getAllProduct(request);
  }

  detailsProduct(id: number){
    this.router.navigate(['product-details', id]);
  }

  private getSearchByName(request, nameProduct){
    this.loading = true;
    this.nameProduct = nameProduct;
    console.log('name == ', this.nameProduct);
    if(this.nameProduct == ''){
      return;
    }
    this.productService.searchByName(request, this.nameProduct)
      .subscribe(data => {
      console.log('data => ', data);
      this.searchProducts = data['content'];
      console.log('data[content] => ',data['content']);
      this.totalElements = data['totalElements'];
      this.sizeSearch = this.totalElements;
      console.log('data[totalElements] => ',data['totalElements']);
      this.loading = false;
    },error =>{
      this.loading = false;
    });
  }

}
