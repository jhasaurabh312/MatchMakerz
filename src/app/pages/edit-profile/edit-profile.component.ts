import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EditProfileModule } from 'src/app/shared/models/EditProfile/edit-profile.module';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  EditProfileDetails: FormGroup;
  response : any;

  constructor(private _formBuilder: FormBuilder,private authService : LoginService, private router: Router , private http : HttpClient) { 
    this. EditProfileDetails= this._formBuilder.group({
      'first_name' : [''],
      'last_name' : [''],
      'age' : [''],
      'gender' : [''],
      'whatsapp_number' : [''],
      'about' : [''],
      'phone_number' : [''],
      'email' : [''],
      'unique_about' : [''],
      'specialization' : [''],
      'experience' : [''],
      'upfront_charge' : [''],
    });; 
  }

  ngOnInit() {
  }

  editProfile(){

    const NewProfile : EditProfileModule = {
          'first_name' : this.EditProfileDetails.get('first_name').value,
          'last_name' : this.EditProfileDetails.get('last_name').value,
          'phone_number' : this.EditProfileDetails.get('phone_number').value,
          'email' : this.EditProfileDetails.get('email').value,
          'unique_about' : this.EditProfileDetails.get('unique_about').value,
          'specialization' : this.EditProfileDetails.get('specialization').value,
          'age': this.EditProfileDetails.get('age').value,
          'gender': this.EditProfileDetails.get('gender').value,          
          'whatsapp_number': this.EditProfileDetails.get('whatsapp_number').value,
          'about': this.EditProfileDetails.get('about').value,
          'experience' : this.EditProfileDetails.get('experience').value,
          'upfront_charge' : this.EditProfileDetails.get('upfront_charge').value,
        }

    //  const NewProfile = new FormData();
    //    NewProfile.append('first_name', this.EditProfileDetails.value.first_name );
    //    NewProfile.append('last_name', this.EditProfileDetails.value.last_name );
    //    NewProfile.append('phone_number', this.EditProfileDetails.value.phone_number );
    //    NewProfile.append('email', this.EditProfileDetails.value.email );
    //    NewProfile.append('about', this.EditProfileDetails.value.about );
    //    NewProfile.append('unique_about', this.EditProfileDetails.value.unique_about );
    //    NewProfile.append('specialization', this.EditProfileDetails.value.specialization );
    //    NewProfile.append('gender', this.EditProfileDetails.value.gender);
    //    NewProfile.append('age', this.EditProfileDetails.value.age );
    //    NewProfile.append('experience', this.EditProfileDetails.value.experience );
    //    NewProfile.append('whatsapp_number', this.EditProfileDetails.value.whatsapp_number );
    //    NewProfile.append('upfront_charge', this.EditProfileDetails.value.upfront_charge );

    //    console.log(this.EditProfileDetails.getRawValue);

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