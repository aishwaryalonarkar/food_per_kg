import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { CartService } from '../../service/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  matBadge:number= 0;
  cartItems:any;

  constructor(private _cartService:CartService) {     
  }

  @Output() toggleSideBarForMe: EventEmitter<any>= new EventEmitter();

  ngOnInit(): void {
    this._cartService.cartItems$.subscribe((value)=>{
      this.cartItems = value;
      this.matBadge = this.cartItems.length;
    })
  }
  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }
}
