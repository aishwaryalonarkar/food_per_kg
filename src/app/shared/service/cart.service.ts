import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // cartItems = new Subject<any>();
  private cartItems = new BehaviorSubject(0);
  public cartItems$ = this.cartItems.asObservable();
  values:any = [];
  cartItemLength:number;
  constructor() { }


  dishFilter=[];
  private dish = new BehaviorSubject(this.dishFilter);
  public dish$ = this.dish.asObservable();
  // public new_dish = new Subject<any>()  


  updateDish(dish:any){
    this.dish.next(dish);
  }


  getDish(){
    return JSON.parse(sessionStorage.getItem('dishes'));
  }

  // updating data
  updateCartData(cartItem:any){
    this.cartItems.next(cartItem);
    sessionStorage.setItem('cartdata',JSON.stringify(cartItem));
  }

  getTotalCartItems():any {
    return JSON.parse(sessionStorage.getItem('cartdata'));
  }

  getCartData(){
    return JSON.parse(sessionStorage.getItem('cartdata'));
  }

  // () i.e returns array lenght / data .

  // () i.e returns all array elements / data.




}
