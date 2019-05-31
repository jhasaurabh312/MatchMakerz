import { Component, OnInit } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http'
import { LoginModule, LoginReturn } from '../../shared/models/login/login.module';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
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
    // console.log(suc);
    if(this.response.status == 1){
      window.location.replace('/my-profile');
      console.log(this.response.token);
    }
  },err =>{
    console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
  });
  
}

  
}


//  login(data){
  
//    let credentials : LoginModule = {
//      "phone_number" : data.phone_number,
//      "otp" : data.otp
//    }  

//    console.log(credentials);
   
//     if(data.otp != null && data.phone_number != null){
//       const options = {headers: {'Content-Type': 'application/json'}};
//       return this.http.post('http://matchmakerz.in/api/v1/matchmaker/login', credentials, options).pipe(catchError(error =>{
//         return throwError("Something went wrong");
//       })
//     ).subscribe( data => {
//       console.log(data);
//     });
//   }    
//     else{
//         alert('Something went wrong');
//        } 
  
//   }

  // login(data){

  //   const loginData = new FormData();
    
  //   this.auth.getUserDetail(data).subscribe( response => {
  //     console.log(response);
  //   });

  // }


     
    // if(suc.login_status === 'N'){
    //   localStorage.setItem('loggedIn','false');
    //   console.log('Email or password is Incorrect!', 'danger', 'top-right');
    // } else {
    //   localStorage.setItem('identityNumber',suc.identity_number);
    //   console.log('suc',suc);
    //   console.log('iden',suc.identityNumber);
    //   localStorage.setItem('loggedIn','true');
    //   document.getElementById('closeModal').click();
    //  this.router.navigateByUrl('dashboard');
    //}

