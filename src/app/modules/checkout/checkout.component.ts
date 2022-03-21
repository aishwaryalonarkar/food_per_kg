import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';
import { MatStepper } from '@angular/material/stepper';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  loginForm:FormGroup;
  resgisterUser:FormGroup;
  optVerify:FormGroup;
  address:FormGroup;
  cardDetails:FormGroup;
  rGenerate:FormGroup;
  contact:any;
  showForm:boolean=false;
  minDate:Date = new Date();
  maxDate:Date;
  minTime = "9:00 am";
  maxTime = "11:00 pm";
  addressline1:string = "Address1";
  addressline2:string = "Address2";
  id:any;
  addressObj:any;
  order:any;

  constructor(private _notifireService:NotifierService, private _userService:UserService, private fb:FormBuilder) {
    this.formValidation();
    const currentYear =  new Date().getFullYear();
    this.minDate = new Date();
    console.log(currentYear);
    this.maxDate = new Date(currentYear +  1, 11, 31);
   }
   formValidation(){
    this.loginForm =  this.fb.group({
      'contact':[null,Validators.compose([Validators.required])],
      // 'otp':[null,Validators.compose([Validators.required])]
    });
    this.resgisterUser = this.fb.group({
      'contact':[null],
      'full_name':[null,Validators.compose([Validators.required])],
      'otp':[null,Validators.compose([Validators.required])],
      'reference_code':[null,Validators.compose([Validators.minLength(5)])],
    });
    this.optVerify = this.fb.group({
      'otp':[null,Validators.compose([Validators.required])]
    });
    this.address = this.fb.group({
      // 'id':[null,Validators.compose([Validators.required])],
      'addressline1':[null,Validators.compose([Validators.required])],
      'addressline2':[null,Validators.compose([Validators.required])],
      'delivery_time':[null,Validators.compose([Validators.required])],
      'deliveryDate':[this.minDate,Validators.compose([Validators.required])]

    });
    this.cardDetails = this.fb.group({
      
    });
    this.rGenerate =  this.fb.group({
      'contact':[null,Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  generatRegisterOtp(contact){
    console.log(contact)
    // this.showForm = true
    this._userService.generateRegisterOtp(contact).subscribe(
      (res:any)=>{
        if(res.response.status == "error") {
          this._notifireService.notify("error",res.response.reason)
         
          this.showForm = false;
        } else {
          console.log(res);
          this._notifireService.notify("Success",res.response.reason);
          // this.contact = res.contact;
          this.resgisterUser.get('contact').setValue(res.cont);
          this.showForm =true;
        }
      },
      (err)=>{
        console.log(err);
        this._notifireService.notify("error",err.error.Msg)
      }
    )
  }

  generateLoginOtp(contact) {
    console.log(contact)
    this._userService.generateLoginOtp(contact).subscribe(
      (res:any)=>{
        console.log(res)
        this.contact = res.contact;
        this._notifireService.notify("Success","Welcome " + res.Msg);
         this.showForm=true;
      },
      (err:any)=>{
        this._notifireService.notify("error",err.error.Msg)
        console.log(err)
      }
    )
  }

  submitOtpLogin(user,stepper:MatStepper){
    user.contact = this.contact;
    console.log(user);
    this._userService.userLogin(user).subscribe(
      (res:any)=>{
        this.address.get('addressline1').setValue(res.addressline1);
        this.address.get('addressline1').setValue(res.addressline1);
        this.address.get('id').setValue(res.id);
        this._notifireService.notify("Success",res.Msg)
        stepper.next();
      },
      (err:any)=>{
          console.log(err);
          this._notifireService.notify("error",err.error.Msg)
      }
    )
  }

  resgister(user,stepper:MatStepper){
    console.log(user);
    this._userService.userRegister(user)
    .subscribe((res:any)=>{
      console.log(res);
      // this.id= res.id;
      if(res.Msg == "Invalid OTP token.")
        this._notifireService.notify("error", res)
      else {
        stepper.next()
        this._notifireService.notify("Success",res);  
        this.address.get('id').setValue(res.id);
      }
    },(err)=>{

      if(err.status == 0)
        this._notifireService.notify('error',"Sorry server error.")
      console.log(err);
    })
  }

  submitAddress(userAddress){
    // console.log(value);
    userAddress.id = "b5le1wqx"
    // userAddress.id = this.id;
    console.log(userAddress)
    this._userService.userAddress(userAddress).subscribe(
      (res:any)=>{
        console.log(res.id);
        // this.id = res.id;
        this.order = this._userService.getUserOrder();
        console.log(this.order);
        // this.order.id = res.id;
        // this.order.deliveryDate = userAddress.deliveryDate;
        this.order.deliveryDate = "3 Apr 2020";
        this.order.deliveryTime = userAddress.delivery_time;
        this._userService.updateUserOrder(this.order)
        console.log(this.order)
        this._notifireService.notify("success",res.Msg)
        this.sendOrderAndRedirect()
        // stepper.next()
      },(err)=>{
        this._notifireService.notify("error",err.error)
      }
    )
   
  }

  sendOrderAndRedirect()
  {
    this.order.id = "b5le1wqx"
    console.log(this.order)
    this._userService.userOrder(this.order).subscribe(
      (res:any)=>{
          console.log(res);
          this.redirect(res.data);
      },(err)=>{
        console.log(err);
      }
    )
  }


  // Payment Redirect
  redirect(data){
    // // let url = "http://localhost:3000/merchantHosted/index";
    // let url = "http://localhost:3000/checkout/index";
    // // let url = "https://test.cashfree.com/billpay/checkout/post/submit"
    let windowName = "FPKG Payment"
    let newwindow=window.open(data.paymentLink,windowName,'height=500,width=800');
       if (window.focus) {newwindow.focus()}
        return false;
  }
}
