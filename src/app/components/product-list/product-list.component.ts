import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
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
  products: Product[]=[];
  loading: boolean;
  name: any;

  checkSearch = false;
  searchProducts: Product[] = [];
  searchText;
  sizeSearch: number = 0;
  nameProduct;
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct({page: 0, size: 5});
  }

  private getAllProduct(request){
    this.loading = true;
    this.productService.pageProduct(request)
      .subscribe(data => {
        console.log(data);
        this.products = data['content'];
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error=>{
        this.loading = false;
      });
  }

  nextPage(event: PageEvent){
    console.log('event -->', event);
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getAllProduct(request);
    // this.getSearchByName(request, this.nameAdmin);
  }

  createProduct(){
    this.router.navigate(['product-form']);
  }
  updateProduct(id: number){
    this.router.navigate(['product-form', id]);
  }
  detailsProduct(id: number){
    this.router.navigate(['product-details', id]);
  }
  // private detailsProduct(id: number){
  //   this.productService.getProduct(id)
  //       .subscribe(response => {
  //         this.product = response
  //       });
  // }

  deleteProduct(id: number){
    this.productService.deleteProduct(id)
        .subscribe(response => {
          this.products = this.products.filter(product => product.id != id);
        })
  }

  //search
  private getSearchByName(request, nameProduct){
    this.loading = true;
    this.nameProduct = nameProduct;
    console.log('name == ', this.nameProduct);
    if(this.nameProduct == ''){
      return;
    }
    this.productService.searchByName(request, this.nameProduct).subscribe(data =>{
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

  private onSearch(){
    this.checkSearch = true;
    console.log('name == ', this.nameProduct);
    if(this.nameProduct == ""){
      this.checkSearch = true;
      return;
    }
      this.getSearchByName({page: 0, size: this.sizeSearch}, this.nameProduct);
  }

}
