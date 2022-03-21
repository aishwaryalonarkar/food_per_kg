import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  
  private userPayloads = new BehaviorSubject(0);
  public userPayloads$ = this.userPayloads.asObservable();


  updateUserOrder(userPayload:any){
    this.userPayloads.next(userPayload);
    sessionStorage.setItem('payload',JSON.stringify(userPayload));
    // console.log(this.userPayloads);
  }
  getUserOrder(){
    return JSON.parse(sessionStorage.getItem('payload'));
  }

  constructor(private _http:HttpClient) { }

  userRegister(user:any){
    return this._http.post( environment.$BASE_URL + "/users/register",user)
  }

  userLogin(user:any){
    return this._http.post(environment.$BASE_URL + '/users/login',user);
  }

  generateLoginOtp(contact:any){
    return this._http.post(environment.$BASE_URL + '/users/genotplogin',contact)
  }
  generateRegisterOtp(contact:any){
    return this._http.post(environment.$BASE_URL+'/users/genotpregister',contact)
  }

  userAddress(user:any)
  {
    return this._http.post( environment.$BASE_URL+'/users/regadd',user);
  }

  userOrder(user:any)
  {
    return this._http.post( environment.$BASE_URL+'/users/order',user);
  }
  
}
