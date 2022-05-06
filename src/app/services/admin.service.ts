import { Role } from './../models/role';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


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

  // searchByName(request, search): Observable<Admin[]>{
  //   const params = request;
  //   const name = search;
  //   return this.httpClient.get<Admin[]>(this.pageUrl+'/search?name='+name, {params});
  // }
}
