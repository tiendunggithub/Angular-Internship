import { Category } from './../models/category';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const httpOptionsWithToken = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization':'Bearer '+ localStorage.getItem('token')
  })
}; 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "http://localhost:8080/api/v1/product";

  private cateURL = "http://localhost:8080/api/v1/category/list";
  
  private pageUrl = "http://localhost:8080/api/v1/product/page";

  host :string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseURL + '/list'}`);
  }

  createProduct(product: Product): Observable<Object>{
    return this.httpClient.post(`${this.baseURL + '/create'}`, product);
  }

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.cateURL}`);
  }

  getProduct(id: number):  Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseURL}/${id}`);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${this.baseURL+'/update/'+product.id}`, product);
  }

  deleteProduct(id: number): Observable<any>{
    return this.httpClient.delete<Product>(`${this.baseURL+'/delete/'+id}`);
  }  
  pageProduct(request): Observable<Product[]>{
    const params = request;
    return this.httpClient.get<Product[]>(`${this.pageUrl}`, {params});
  }

  getProdByCate(id:number, request){
    const params = request;
    return this.httpClient.get(this.baseURL+"/getProductsByCategory/"+id, {params});
  }

  searchByName(request, search): Observable<Product[]>{
    const params = request;
    const nameProduct = search;
    return this.httpClient.get<Product[]>(this.pageUrl+'/search/'+nameProduct, {params});
  }

  saveProductImage(formData: FormData): Observable<any>{
    return this.httpClient.post<Product>(`${this.baseURL+'/create'}`, formData);
  }

  updateProductImage(id: number, value: any): Observable<Object>{
    return this.httpClient.put(`${this.baseURL+'/update/'+id}`, value);
  }

  getImage(id: number){
    return this.httpClient.get(this.baseURL+'/images/'+id,httpOptionsWithToken);
  }

  getProductListWithToken(){
    return this.httpClient.get(this.baseURL+'/list',httpOptionsWithToken);
  }

  getPageProductWithToken(request){
    return this.httpClient.get(this.baseURL+'/list'+request,httpOptionsWithToken);
  }
  
  getProductByCategory(request){
    return this.httpClient.get(this.baseURL+'/getProductsByCate'+request, httpOptionsWithToken);
  }
}
