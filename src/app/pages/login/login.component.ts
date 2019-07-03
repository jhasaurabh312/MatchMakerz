import { Component, OnInit } from '@angular/core';
import { LoginModule, LoginReturn } from '../../shared/models/login/login.module';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


 loginDetails: FormGroup;
 private response : LoginReturn;


 constructor( private _formBuilder: FormBuilder,private authService : LoginService, private router: Router, private http:HttpClient) { 
 this.loginDetails = this._formBuilder.group({
   'email': [ localStorage.getItem('signup_phone_number')],
   'password': [''],
 });;
}


 ngOnInit() {
    var countDownDate = new Date().getTime() + 61000;
    var x = setInterval(function() {

      var now = new Date().getTime();
      var distance = countDownDate - now;
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById("timer").innerHTML = seconds + "sec";
      // console.log( document.getElementById("timer").innerHTML);  
      if (distance <= 0) {  
        clearInterval(x);
        document.getElementById("timer").innerHTML = "expired";
        
      }
    }, 1000);
}


submitLogin(){
  const loginData = new FormData();
  loginData.append('phone_number' , this.loginDetails.value.email );
  loginData.append('otp', this.loginDetails.value.password);
  console.log(loginData)
  this.authService.login(loginData).subscribe((suc:any) => {
    this.response = suc;
    console.log(suc);
    if(this.response.status === 1){
      localStorage.setItem('token',this.response.token);
      console.log(localStorage.getItem('token'));
      this.router.navigate(['/clients']);
      // window.location.href=('/my-profile');
    }
    else if(this.response.status === 3) {
      this.router.navigate(['/signup']);
    }

    else if(this.response.status === 2){
      alert("Wait while your profile is being verified ");
    }
  },err =>{
    console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
  });
}

resendOTP(){
  event.preventDefault();
   
    this.http.get('http://matchmakerz.in/api/v1/matchmaker/loginotp?phone_number='+ localStorage.getItem('mpn')).subscribe((response) => {
      alert('OTP Resent !!!');
    })
}

EditNumber(){
  this.router.navigate(['/get-otp']);
}

  
}


//7210644426

