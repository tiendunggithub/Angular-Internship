import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Category } from './../../models/category';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  product: Product = new Product();
  categories: Category[] = []; 

  public imagePath;
  imgURL: any;

  public prodFile: any = File;
  formCreate: any = FormGroup;
  //------------
  constructor(private productService:ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public fb: FormBuilder) { }

  

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
    
        this.formCreate = this.fb.group({
          id : [''],
          name: [''],
          image: [''],
          price: [''],
          promotion: [''],
          description: [''],
          category: ['']
        })
  }

  // onSelectFile(event){
  //   const file = event.target.files[0];
  //   console.log(file); 
  // }
  
  // onSelectFile(event){
  //   if(event.target.files.length > 0){
  //     const file = event.target.files[0];
  //     console.log(file);
  //     this.productFile = file;

  //     var mimeType = event.target.files[0].type;
  //     if(mimeType.match(/image\/*/) == null){
  //       this.message = "Only images are supported.";
  //       return;
  //     }

  //     var reader = new FileReader();

  //     this.imagePath = file;
  //     reader.readAsDataURL(file);
  //     reader.onload = (_event) =>{
  //       this.imgURL = reader.result;
  //     }
  //   }
  // }

  // onSelectCate(id: number){
  //   this.categoryService.getData(id).subscribe( data =>{
  //     this.cate = data;
  //     this.wcode = (10000 + this.cate.rang).toString().substring(1);
  //     this.wcode = this.cate.id + this.cate.code + this.wcode;
  //     this.f['code'].setValue(this.wcode);
  //   })
  // }

  

  goToProductList(){
    this.router.navigate(['product']);
  }
  
  onSelectFile(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      console.log(file);
      this.prodFile = file;

    var mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/) == null){
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();

    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) =>{
      this.imgURL = reader.result;
    }
    }
    
  }
  
  saveProduct(submitForm: FormGroup){
    const product = submitForm.value;
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('file', this.prodFile);
    this.productService.saveProductImage(formData).subscribe(data =>{
      console.log(data);
      this.goToProductList();
      
    })
  }

  // saveProduct(){
  //   this.productService.createProduct(this.product)
  //       .subscribe(response => 
  //         this.goToProductList(), 
  //         error => console.log(error));
  // }

  updateProduct(){
    this.productService.updateProduct(this.product)
        .subscribe(response =>{
          this.goToProductList();
        },
        error => console.log(error));
  }

  comparativeCategory(o1: Category, o2: Category): boolean{
    if(o1 == undefined && o2 == undefined){
      return true;
    }
    return o1 == null || o2 == null || o1 == undefined || o2 == undefined ? false: o1.id == o2.id;
  }
}