import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Category } from './../../models/category';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  product: Product = new Product();
  categories: Category[] = []; 
  products: Product[] = [];

  id: any;
  productFile;
  public imagePath;
  imgURL: any;
  
  public prodFile: any = File;
  productForm: any = FormGroup;

  constructor(private productService:ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public fb: FormBuilder,
    private toastr: ToastrService) { }

    
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

        this.productForm = this.fb.group({
          id : [''],
          name: [''],
          image: [''],
          price: [''],
          promotion: [''],
          description: [''],
          category: ['']
        })
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
    }else{
      this.prodFile = this.imagePath;
    }
  }

  goToProductList(){
    this.router.navigate(['admin/product']);
  }

  saveProduct(submitForm: FormGroup){
    const product = submitForm.value;
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('file', this.prodFile);
    this.productService.saveProductImage(formData).subscribe(data =>{
      console.log(data);
      this.goToProductList();
      this.toastr.success('Thêm thành công', 'Thông báo' );
    })
  }
  
  // saveProduct(){
  //   this.productService.createProduct(this.product)
  //       .subscribe(response => 
  //         this.goToProductList(), 
  //         error => console.log(error));
  // }

  updateProduct(){    
    const formData = new FormData();
    const product = this.productForm.value;
    formData.append('product', JSON.stringify(product));
    formData.append('file', this.prodFile);
    this.productService.updateProductImage(this.product.id, formData).subscribe(data=>{
      console.log(data);
      this.goToProductList();
      this.toastr.success('Cập nhật thành công', 'Thông báo' );
    });
  }

  // updateProduct(){
  //   this.productService.updateProduct(this.product).subscribe(data =>{
  //     console.log(data);
  //     this.goToProductList();
  //     this.toastr.success('Sửa thành công', 'Thông báo' );
  //   })
  // }

  comparativeCategory(o1: Category, o2: Category): boolean{
    if(o1 == undefined && o2 == undefined){
      return true;
    }
    return o1 == null || o2 == null || o1 == undefined || o2 == undefined ? false: o1.id == o2.id;
  }
}
