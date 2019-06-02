import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoginModule { 
  "phone_number" : string;
  "otp": string;
}

export class LoginReturn {
  status : number;
  token : string;
}

export class SignupModel{
  first_name: string;
  last_name : string;
  about: string;
  age: string;
  password : string;
  gender : string;
  whatsapp_number: string;
  referred_by : string;
  location: string;
  unique_about : string ;
  specialization : string;
  latitude : string;
  longitude : string;
  matchmaker_type : string;
}
