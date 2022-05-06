import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = "http://localhost:8080/api/v1/category";

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseURL+'/list'}`);
  }

  createCategory(category: Category): Observable<Object>{
    return this.httpClient.post(`${this.baseURL+'/create'}`, category);
  }

  getData(id: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }
}
