import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Router } from '@angular/router'
import { UserService } from 'src/app/shared/service/user.service';
import { tick } from '../../../../node_modules/@angular/core/testing';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItem:any = [];
  totalItems:number;
 
  temp=0;
  order:any=[];
  payload:any=[];
  total:number;
  tax:number;
  sub_total:number;
  cartFinal:any = [];
  veg='../../../assets/img/icons/veg.png';
  nveg='../../../assets/img/icons/non-veg.png';
  
  constructor(private _cartService:CartService, private router: Router, private _userService:UserService) { 
  }
s
  ngOnInit(): void {

    this.cartItem  = this._cartService.getCartData()
    this.calculateTotal();
  // console.log(this.cartItem);
  }


changeQuant(operation,dish) //not changing selectedCost
{
  if(dish.selectedCost==undefined)
  {dish.selectedCost=dish.cost}
  this.temp=0;
  if(operation=="increase")
  {
      if(dish.itemVolumeType=="KG")
      {
        dish.itemVolume=dish.itemVolume+0.5;
        this.temp=Number(dish.selectedCost)*0.5;
        dish.cost=Number(dish.cost)+Number(this.temp);
      }
      else
      {
        dish.itemVolume=dish.itemVolume+1;
        dish.cost=Number(dish.selectedCost)+Number(dish.cost);
      }
  }
  else if(operation == "decrease" && dish.itemVolume>1)
  {
    if(dish.itemVolumeType=="KG")
    {
      dish.itemVolume=dish.itemVolume-0.5;
      this.temp=Number(dish.selectedCost)*0.5;
      dish.cost=Number(dish.cost)-Number(this.temp);
    }
    else
    {
      dish.itemVolume=dish.itemVolume-1;
      dish.cost=Number(dish.cost)-Number(dish.selectedCost);
    }
  }
  this.calculateTotal()
  this._cartService.updateCartData(this.cartItem);
}

calculateTotal()
{
  this.sub_total=0;
  for(let i=0;i<this.cartItem.length;i++)
  {
    this.sub_total=this.sub_total+Number(this.cartItem[i].cost)
  }
  this.tax=this.sub_total*0.05
  this.total=this.tax+this.sub_total;
}

Remove(dish)
{
  this.cartItem.splice(dish,1)
  this._cartService.updateCartData(this.cartItem);
  this.calculateTotal()
}
  
  
sendJson()
{
  this.payload={};
  this.order=[];
  console.log("sending order...")
  for(let i=0;i<this.cartItem.length;i++)
  {
    this.order.push(
      {
      "dishId":this.cartItem[i].dishId,
      "dishName":this.cartItem[i].dish,
      "dishVariant":this.cartItem[i].selectedVariant,
      "dishVariation":this.cartItem[i].selectedVariation,
      "foodType":this.cartItem[i].foodType,
      "dishVolume":this.cartItem[i].itemVolume,
      "dishVolumeType":this.cartItem[i].itemVolumeType
     }
    )
  }
  // this.order.push({"total":this.total})
  // console.log(this.order)
  // console.log(this. _userService.getUserPayload())

  this.payload.orders=this.order;
  this.payload.total=this.total
  // this.payload.push({
  //   "orders":this.order,
  //   "total":this.total
  // })
  this._userService.updateUserOrder(this.payload)
  this.router.navigate(['/checkout'])
}

}