import { Router, ActivatedRoute } from '@angular/router';
import { Category } from './../../models/category';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  categories: Category[] = []; 

  constructor(private productService:ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getCategories()
        .subscribe(response => this.categories = response);  
    
        this.activatedRouter.params
        .subscribe(params => {
          let id: number = params['id'];
          if(id){
            this.productService.getProduct(id)                
                .subscribe(response => this.product = response);
          }
        })
  }
  goToProductList(){
    this.router.navigate(['product']);
  }

  comparativeCategory(o1: Category, o2: Category): boolean{
    if(o1 == undefined && o2 == undefined){
      return true;
    }
    return o1 == null || o2 == null || o1 == undefined || o2 == undefined ? false: o1.id == o2.id;
  }

}
