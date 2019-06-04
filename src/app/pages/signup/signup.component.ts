import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Router } from '@angular/router';
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
      'about' : [''],
      'phone_number' : [''],
      'unique_about' : [''],
      'specialization' : [''],
      'password' : [''],
      'location' : [''],
      'lattitude' : [''],
      'longitude' : [''],
    });; 
  }

  ngOnInit() {
  }


  signup(){
    const loginData  =  new FormData()
    
    loginData.append( 'first_name' , this.signupDetails.value.first_name),
    loginData.append('last_name' , this.signupDetails.value.last_name),
    loginData.append( 'age', this.signupDetails.value.age),
    loginData.append('gender', this.signupDetails.value.gender),
    loginData.append('referred_by', this.signupDetails.value.referred_by),
    loginData.append('whatsapp_number', this.signupDetails.value.whatsapp_number),
    loginData.append('about', this.signupDetails.value.about),
    loginData.append('phone_number',this.signupDetails.value.phone_number),
    loginData.append('unique_about',this.signupDetails.value.unique_about),
    loginData.append('specialization',this.signupDetails.value.specialization),
    loginData.append('matchmaker_type' , this.signupDetails.value.matchmaker_type),
    loginData.append('password', 'XXX'),
    loginData.append('location','NA'),
    loginData.append('longitude' , 'NA'),
    loginData.append('lattitude','NA')

      
      
    console.log(loginData);
  
    const headers = new HttpHeaders({
      // 'Authorization': 'Token ' + localStorage.getItem('token')
      'Content-type' : 'application/json',
    })
    
    return this.http.post('http://matchmakerz.in/api/v1/matchmaker/register', loginData , { headers: headers }).subscribe((response) => {
      this.response = response;
      console.log(this.response);
    })
        
  }

}


// phone_number,
// first_name
// last_name,
// about,
// unique_about,
// specialization,
// gender,
// age,
// referred_by,
// whatsapp_number