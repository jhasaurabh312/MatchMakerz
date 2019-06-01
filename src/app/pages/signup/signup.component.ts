import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupDetails: FormGroup;
  loginData : any;
  response : any;

  constructor(private _formBuilder: FormBuilder,private authService : LoginService, private router: Router) { 
    this.signupDetails = this._formBuilder.group({
      'first_name' : [''],
      'last_name' : [''],
      'age' : [''],
      'gender' : [''],
      'matchmaker_type' : [''],
      'referred_by' : [''],
      'whatsapp_number' : [''],
      'about' : ['']
    });; 
  }

  ngOnInit() {
  }


  signin(){
    const loginData = new FormData();
   


    loginData.append('first_name' , this.signupDetails.get('first_name').value);
    loginData.append('last_name', this.signupDetails.get('last_name').value);
    loginData.append('age', this.signupDetails.get('age').value);
    loginData.append('gender', this.signupDetails.get('gender').value);
    loginData.append('matchmaker_type', this.signupDetails.get('matchmaker_type').value);
    loginData.append('referred_by', this.signupDetails.get('referred_by').value);
    loginData.append('whatsapp_number', this.signupDetails.get('whatsapp_number').value);
    loginData.append('about', this.signupDetails.get('about').value);

    console.log(loginData);


    // this.authService.register(loginData).subscribe((suc:any) => {
    //   this.response = suc;
    //   console.log(suc);
    //   // if(this.response.status === 1){
    //   //   localStorage.setItem('token',this.response.token);
    //   //   console.log(localStorage.getItem('token'));
    //   //   window.location.replace('/my-profile');
    //   // }
    //   // else if(this.response.status === 3) {
    //   //   window.location.replace('/signup');
    //   // }
    // },err =>{
    //   console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
    // });
  }

}
