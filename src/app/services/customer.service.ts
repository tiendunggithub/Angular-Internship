import { Observable } from 'rxjs';
import { Customer } from './../models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "http://localhost:8080/api/v1/customer";

  constructor(private httpClient: HttpClient) { }

  getListCustomer(request): Observable<Customer[]>{
    const params = request;
    return this.httpClient.get<Customer[]>(this.baseURL+"/list", {params});
  }
  
  getCustomer(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>(this.baseURL+"/"+id);
  }

  registration(customer: Customer): Observable<any>{
    return this.httpClient.post<any>(this.baseURL+"/registration", customer);
  }

  login(customer: Customer): Observable<any>{
    return this.httpClient.post<any>(this.baseURL+"/login", customer);
  }
}
