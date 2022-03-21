import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/Constant'
import { CartService } from 'src/app/shared/service/cart.service';
@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})

export class MenuHeaderComponent implements OnInit {


    dishFilter=[];
    Categories = Constant.Categories;
    Dishes = Constant.Dishes;
    foodType:string;
    category:string;
    cuisineType:string;
    Variation = Constant.Variation;
    categoryFilter=[];
  
    constructor(private _cartService:CartService) {
        this.foodType = "veg"
        this.category = "Appetisers"
        this.cuisineType = "indian"
     }
  
    ngOnInit(): void {
      this.FilterDishes(1,4);
    }
    
    FilterDishes(type,value)
    {
      if(type=='foodType')
      {
        if(value==true)
        {this.foodType="non-veg"}
        else
        {this.foodType="veg"}
      }
      if(type=='cuisineType')
      {
        if(value==true)
        {this.cuisineType="chinese"}
        else
        {this.cuisineType="indian"}
      }    
      else if(type=='category')
      {
        this.category=value
      }
      this.categoryFilter=[]
      for(let i=0;i<this.Categories.length;i++)
      {
        if(this.Categories[i].foodType==this.foodType && this.Categories[i].cuisineType==this.cuisineType)
        {
          this.categoryFilter.push(this.Categories[i])
        }
      }
      console.log(this.foodType)
      console.log(this.cuisineType)
      console.log(this.category)
      this.dishFilter=[]
      for(let i=0;i<this.Dishes.length;i++)
      {
        if(this.Dishes[i].foodType==this.foodType && this.Dishes[i].cuisineType==this.cuisineType && this.Dishes[i].category==this.category)
        {
          this.dishFilter.push(this.Dishes[i])
        }
      }
      if(this.dishFilter.length==0)
      {
        this.FilterDishes('category',"Appetisers")
      }
      this._cartService.updateDish(this.dishFilter);
    // console.log(this.dishFilter)
    }
  
  }
  





