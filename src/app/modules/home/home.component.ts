import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { Constant } from 'src/Constant'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }
cardList=[]
Images = Constant.Corousals;
  ngOnInit(): void {
    for(let i=0;i<3;i++)
    {
      this.cardList.push(i)
    }
  }
  scrollToElement($element): void {
    console.log($element);
    var elmnt = document.getElementById($element);
    elmnt.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // $element[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
