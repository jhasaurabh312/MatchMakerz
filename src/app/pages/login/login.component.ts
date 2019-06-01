import { Component, OnInit } from '@angular/core';
import { LoginModule, LoginReturn } from '../../shared/models/login/login.module';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


 loginDetails: FormGroup;
 forgotDetails: FormGroup;
 fdorgot:Boolean = false;
 login:Boolean = true;
 mverify = false;
 sucess = false;
 forgotpasswordEmail;

 private response : LoginReturn;


 constructor( private _formBuilder: FormBuilder,private authService : LoginService, private router: Router) { 
 this.loginDetails = this._formBuilder.group({
   'email': [''],
   'password': [''],
 });;
}


 ngOnInit() {
   
}


submitLogin(){
  const loginData = new FormData();
  loginData.append('phone_number' , this.loginDetails.value.email );
  loginData.append('otp', this.loginDetails.value.password);
  this.authService.login(loginData).subscribe((suc:any) => {
    this.response = suc;
    console.log(suc);
    if(this.response.status === 1){
      localStorage.setItem('token',this.response.token);
      console.log(localStorage.getItem('token'));
      window.location.replace('/my-profile');
    }
    else if(this.response.status === 3) {
      window.location.replace('/signup');
    }
  },err =>{
    console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
  });
}

  
}


//7210644426

