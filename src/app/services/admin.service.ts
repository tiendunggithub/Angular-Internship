import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Admin } from '../models/admin';
import { catchError, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = "http://localhost:8080/api/v1/";

  private baseURL = "http://localhost:8080/api/v1/admin";

  private pageUrl = "http://localhost:8080/api/v1/admin/page";
  
  constructor(private httpClient: HttpClient) { }

  getAdminList(): Observable<Admin[]>{
    return this.httpClient.get<Admin[]>(`${this.baseURL+'/list'}`);
  }

  createAdmin(admin: Admin): Observable<Object>{
    return this.httpClient.post(`${this.baseURL+'/create'}`, admin);
  }

  getRoles(): Observable<Role[]>{
    return this.httpClient.get<Admin[]>(`${this.baseURL+'/role'}`);
  }

  getAdmin(id: number):  Observable<Admin>{
    return this.httpClient.get<Admin>(`${this.baseURL}/${id}`);
  }

  updateAdmin(admin: Admin): Observable<Admin>{
    return this.httpClient.put<Admin>(`${this.baseURL+'/update/'+admin.id}`, admin);
  }

  deleteAdmin(id: number): Observable<any>{
    return this.httpClient.delete<Admin>(`${this.baseURL+'/delete/'+id}`);
  }

  pageAdmin(request): Observable<Admin[]>{
    const params = request;
    return this.httpClient.get<Admin[]>(`${this.pageUrl}`, {params});
  }

  searchByName(request, search): Observable<Admin[]>{
    const params = request;
    const nameAdmin = search;
    return this.httpClient.get<Admin[]>(this.pageUrl+'/search/'+nameAdmin, {params});
  }

  loginAdmin(admin: Admin): Observable<Object>{
    console.log(admin);
    return this.httpClient.post(`${this.baseURL+'/login'}`, admin);
  }

  loginRequest(request){
    return this.httpClient.post(this.baseURL+"/login",request,httpOptions);
  }

  setLoginData(data){
    localStorage.setItem("login_data",JSON.stringify(data.user_profile_details));
  }

  HaveAccess(){
    var loggintoken=JSON.parse(localStorage.getItem("login_data")|| '{}');
    // var _extractedtoken=loggintoken.split('.')[1];
    // var _atobdata=atob(_extractedtoken);
    // var _finaldata=JSON.parse(_atobdata);
    console.log("loggintoken: " +loggintoken)
    if(loggintoken.role_id!=null){
      return true;
    }
    alert('Bạn không có quyền truy cập')
    return false;
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

  // logout(){
  //   return localStorage.setItem("token","");
  // }

  isLogin(){
    if(this.getLoginToken() != ""){
      return true;
    }
    return false;
  }
//=============================================

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

  getToken(){
    return localStorage.getItem('token');
  }
  // searchByName(request, search): Observable<Admin[]>{
  //   const params = request;
  //   const name = search;
  //   return this.httpClient.get<Admin[]>(this.pageUrl+'/search?name='+name, {params});
  // }
  postRequestWithToken(url:string,param:{}){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.getLoginToken()
      })
    }; 
    param['userId'] = "1";
    return this.httpClient.post(this.url+url,param,httpOptionsWithToken);
  }

  
  // private handleError(error: any) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //         return throwError("Something went wrong..while connecting with server");
  //     }
  //   }
  
}
