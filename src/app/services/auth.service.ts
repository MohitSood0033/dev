import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  TokenStorageServiceService } from '../helpers/token-stroage-service.service';

const AUTH_API = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({
  "X-Custom-Header": "application/json",
  // "x-access-token":token//
 })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, public tokenStorage:TokenStorageServiceService) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/login', {
      email,
      password
    }, httpOptions);
  }
  register(first_name:string,last_name:string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/register', {
     first_name,
     last_name,
      email,
      password,
    }, httpOptions);
  }
  checkEmail(email: string): Observable<any> {
    return this.http.post(AUTH_API + '/api/checkEmail', {
      email,
   }, httpOptions);
  }
  token=this.tokenStorage.getToken()
  updateProfile(first_name:string,last_name:string):Observable<any>{
    return this.http.patch(AUTH_API+"profile",{
      first_name,
      last_name
    },httpOptions)
  }
  updatePassword(OldPassword:string,password:string):Observable<any>{
    return this.http.patch(AUTH_API+"profileP",{
      OldPassword,
      password
    },httpOptions)
  }
  users(){
    return this.http.get(AUTH_API + '/api/users', {
   });
  }
}