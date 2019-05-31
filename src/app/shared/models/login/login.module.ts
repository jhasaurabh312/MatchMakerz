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
