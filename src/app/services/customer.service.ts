import { Observable, throwError } from 'rxjs';
import { Customer } from './../models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan,catchError,tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = "http://localhost:8080/api/v1/";

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

  loginRequest(request){
    return this.httpClient.post(this.baseURL+"/login",request,httpOptions);
  }

  public wellcome(token){
    let tokenStr = 'Bearer '+token;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.httpClient.get(this.baseURL+"/status",{headers,responseType: 'text' as 'json'});
  } 

  setLoginData(data){
    localStorage.setItem("login_data",JSON.stringify(data.user_profile_details));
  }

  getLoginDataByKey(key){
    let data = JSON.parse(localStorage.getItem("login_data") || '{}');
    if(data.hasOwnProperty(key)){
      return data[key]
    }
    return null;
  }

  setLoginToken(token){
    return localStorage.setItem("token",token);
    
  }

  getLoginToken(){
    return localStorage.getItem("token");
  }

  loginUser(token){
    localStorage.setItem("token", token)
    return true;
  }

  isLoggedIn(){
    let token = localStorage.getItem("token")
    if(token == undefined || token ==='' || token == null){
      return false;
    }else{
      return true;
    }
    
  }

  logout(){
    localStorage.removeItem('token');
    return true;
  }

  requestWithToken(url:string,param:{}){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.getLoginToken()
      })
    }; 
    var loginData = JSON.parse(localStorage.getItem("login_data") || '{}');
    var userId = loginData.user_id;
    param['userId'] = userId;
    // console.log("userID: "+userId)
    // param['userId'] = "1";
    return this.httpClient.post(this.url+url,param,httpOptionsWithToken);
  }

  // private handleError(error: any) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //         return throwError(() => "Something went wrong..while connecting with server");
  //     }
  //   }
}
