import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EditProfileModule { 
  first_name: string;
  last_name : string;
  phone_number : string;
  email : string;
  about: string;
  unique_about : string ;
  specialization : string;
  gender : number;
  age: number;
  experience : string;
  whatsapp_number: string;
  upfront_charge : string;
}
