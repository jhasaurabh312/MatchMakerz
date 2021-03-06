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
  data : any;

  constructor(private _formBuilder: FormBuilder,private authService : LoginService, private router: Router , private http : HttpClient ){ 
    this.signupDetails = this._formBuilder.group({
      'first_name' : [localStorage.getItem('signup_first_name')],
      'last_name' : [localStorage.getItem('signup_last_name')],
      'age' : [localStorage.getItem('signup_age')],
      'gender' : [localStorage.getItem('signup_gender')],
      'matchmaker_type' : ['1'],
      'referred_by' : [localStorage.getItem('signup_referred_by')],
      'whatsapp_number' : [localStorage.getItem('signup_whatsapp_number')],
      'about' : [localStorage.getItem('signup_about')],
      'phone_number' : [localStorage.getItem('signup_phone_number')],
      'unique_about' : [localStorage.getItem('signup_unique_about')],
      'specialization' : [localStorage.getItem('signup_specialization')],
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

    localStorage.setItem('signup_first_name' , this.signupDetails.value.first_name);
    localStorage.setItem('signup_last_name' , this.signupDetails.value.last_name);
    localStorage.setItem( 'signup_age', this.signupDetails.value.age);
    localStorage.setItem('signup_gender', this.signupDetails.value.gender);
    localStorage.setItem('signup_referred_by', this.signupDetails.value.referred_by);
    localStorage.setItem('signup_whatsapp_number', this.signupDetails.value.whatsapp_number);
    localStorage.setItem('signup_about', this.signupDetails.value.about);
    localStorage.setItem('signup_phone_number',this.signupDetails.value.phone_number);
    localStorage.setItem('signup_unique_about',this.signupDetails.value.unique_about);
    localStorage.setItem('signup_specialization',this.signupDetails.value.specialization);
    localStorage.setItem('signup_matchmaker_type' , this.signupDetails.value.matchmaker_type);


   if(this.signupDetails.value.referred_by == null ||this.signupDetails.value.referred_by==='' )
      this.signupDetails.value.referred_by = 'na';

    
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
    loginData.append('matchmaker_type' , '1'),
    loginData.append('password', 'XXX'),
    loginData.append('location','NA'),
    loginData.append('longitude' , 'NA'),
    loginData.append('lattitude','NA')

      
      
    console.log(loginData);
  
    return this.http.post('http://matchmakerz.in/api/v1/matchmaker/register', loginData ).subscribe((response) => {
      this.data = response;
      console.log(this.data);
      if(this.data.status === 1){
          localStorage.setItem('token' , this.data.auth_token);
          this.router.navigate(['/my-profile']);
      }
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