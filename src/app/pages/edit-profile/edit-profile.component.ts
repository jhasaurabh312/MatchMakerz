import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Router } from '@angular/router';
import { SignupModel } from 'src/app/shared/models/login/login.module';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EditProfileModule } from 'src/app/shared/models/EditProfile/edit-profile.module';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  EditProfileDetails: FormGroup;
  loginData : any = [];
  response : any;

  constructor(private _formBuilder: FormBuilder,private authService : LoginService, private router: Router , private http : HttpClient) { 
    this. EditProfileDetails= this._formBuilder.group({
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

  editProfile(){

    const NewProfile : EditProfileModule = {
          'first_name' : this.EditProfileDetails.get('first_name').value,
          'last_name' : this.EditProfileDetails.get('last_name').value,
          'phone_number' : this.EditProfileDetails.get('').value,
          'email' : this.EditProfileDetails.get('').value,
          'unique_about' : this.EditProfileDetails.get('').value,
          'specialization' : this.EditProfileDetails.get('').value,
          'age': this.EditProfileDetails.get('age').value,
          'gender': this.EditProfileDetails.get('gender').value,          
          'whatsapp_number': this.EditProfileDetails.get('whatsapp_number').value,
          'about': this.EditProfileDetails.get('about').value,
          'experience' : this.EditProfileDetails.get('').value,
          'Upfront_charge' : this.EditProfileDetails.get('').value,
        }


        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        })

          
        return this.http.post('http://matchmakerz.in/api/v1/matchmaker/profile', NewProfile, { headers: headers }).subscribe((response) => {
          this.response = response;
          console.log(this.response);
        })
        
  }

}


  // signin(){
  //  
  
  
  // }