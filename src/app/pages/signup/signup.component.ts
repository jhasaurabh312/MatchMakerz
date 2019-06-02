import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Router } from '@angular/router';
import { SignupModel } from 'src/app/shared/models/login/login.module';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupDetails: FormGroup;
  loginData : any = [];
  response : any;

  constructor(private _formBuilder: FormBuilder,private authService : LoginService, private router: Router , private http : HttpClient ){ 
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


  // signin(){
  //   const loginData : SignupModel = {
  //     'first_name' : this.signupDetails.get('first_name').value,
  //     'last_name' : this.signupDetails.get('last_name').value,
  //     'age': this.signupDetails.get('age').value,
  //     'gender': this.signupDetails.get('gender').value,
  //     'matchmaker_type': this.signupDetails.get('matchmaker_type').value,
  //     'referred_by': this.signupDetails.get('referred_by').value,
  //     'whatsapp_number': this.signupDetails.get('whatsapp_number').value,
  //     'about': this.signupDetails.get('about').value
  //   }
  
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Token ' + localStorage.getItem('token')
  //   })
    
  //   return this.http.post('http://matchmakerz.in/api/v1/matchmaker/register', loginData, { headers: headers }).subscribe((response) => {
  //     this.response = response;
  //     console.log(this.response);
  //   })
        
  // }

}
