import { Component, OnInit } from '@angular/core';

// import {MatSnackBar} from '@angular/material/snack-bar';
import { Constant } from 'src/Constant'
import { CartService } from 'src/app/shared/service/cart.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  isSessionPresent=[];
  variation:string
  variant:string
  cartItem:any = [];
  dishFilter=[];
  veg_icon="../../../assets/img/icons/veg.png";
  non_veg_icon="../../../assets/img/icons/non-veg.png";
  vari:string="";
  addedId=[];
  Variation = Constant.Variation;
  
  constructor(private _cartService:CartService) {
   }

  ngOnInit(): void {
    this.updateId();

    this._cartService.dish$.subscribe((data)=>{
      this.dishFilter=data;
      // console.log(data)
    })

  }
  

  selectValue(attribute,value,i)
  {
    // console.log(i)
    
    if(attribute == "variation") {
        i.selectedVariation = value
        i.cost=value.price
        i.selectedCost=value.price
    }
    else if(attribute == "variant") {
        i.selectedVariant = value
        i.selectedCost=i.cost
    }
    if(i.variationType>=3)
    {
        if(i.selectedVariant==undefined || i.selectedVariation==undefined)
        {
            i.variationType=1;
            return;
        }
    }
      else{
          i.variationType = 0;
      }
  }

  addToCart(dish:any){  
    this.isSessionPresent=this._cartService.getCartData();
    if(this.isSessionPresent != null)
    {
      this.cartItem.push(dish);
      for(let i=0;i<this.isSessionPresent.length;i++)
      {
        if(this.isSessionPresent[i].dishId==dish.dishId)
        {
          //dont pusha
          alert("already added");
          break;
        }
      }
      this.isSessionPresent.push(dish);
      this._cartService.updateCartData(this.isSessionPresent);
    }
    else
    {
      this.cartItem.push(dish);
      this._cartService.updateCartData(this.cartItem);
    }
    this.addedId.push(dish.dishId);
  }

  updateId()
  {
    this.isSessionPresent=this._cartService.getCartData();
    if(this.isSessionPresent!=null)
    {
      for(let i=0;i<this.isSessionPresent.length;i++)
      {
        this.addedId.push(this.isSessionPresent[i].dishId)
      }
    }
    // console.log(this.addedId);
  }


}
