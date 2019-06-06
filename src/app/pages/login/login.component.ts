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
 private response : LoginReturn;


 constructor( private _formBuilder: FormBuilder,private authService : LoginService, private router: Router) { 
 this.loginDetails = this._formBuilder.group({
   'email': [ localStorage.getItem('mpn')],
   'password': [''],
 });;
}


 ngOnInit() {

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
      window.location.replace('/my-profile');
    }
    else if(this.response.status === 3) {
      window.location.replace('/signup');
    }

    else if(this.response.status === 2){
      alert("Wait while your profile is being verified ");
    }
  },err =>{
    console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
  });
}

  
}


//7210644426

