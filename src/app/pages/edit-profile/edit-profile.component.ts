import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EditProfileService } from 'src/app/shared/services/editProfile/edit-profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  EditProfileDetails: FormGroup;
  error : any;

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, private edit : EditProfileService) { 
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

  editProfile(data){


     const NewProfile  = new FormData();
   
    NewProfile.append('first_name', this.EditProfileDetails.value.first_name );
    NewProfile.append('last_name', this.EditProfileDetails.value.last_name );
    NewProfile.append('phone_number', this.EditProfileDetails.value.phone_number );
    NewProfile.append('email', this.EditProfileDetails.value.email );
    NewProfile.append('about', this.EditProfileDetails.value.about );
    NewProfile.append('unique_about', this.EditProfileDetails.value.unique_about );
    NewProfile.append('specialization', this.EditProfileDetails.value.specialization );
    NewProfile.append('gender', this.EditProfileDetails.value.gender);
    NewProfile.append('age', this.EditProfileDetails.value.age );
    NewProfile.append('experience', this.EditProfileDetails.value.experience );
    NewProfile.append('whatsapp_number', this.EditProfileDetails.value.whatsapp_number );
    NewProfile.append('upfront_charge', this.EditProfileDetails.value.upfront_charge );

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/matchmaker/profile' , NewProfile ,{ 
        headers : new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response);
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }

}


    // const NewProfile : EditProfileModule = {
    //       'first_name' : this.EditProfileDetails.get('first_name').value,
    //       'last_name' : this.EditProfileDetails.get('last_name').value,
    //       'phone_number' : this.EditProfileDetails.get('phone_number').value,
    //       'email' : this.EditProfileDetails.get('email').value,
    //       'unique_about' : this.EditProfileDetails.get('unique_about').value,
    //       'specialization' : this.EditProfileDetails.get('specialization').value,
    //       'age': this.EditProfileDetails.get('age').value,
    //       // 'gender': this.EditProfileDetails.get('gender').value,          
    //       'whatsapp_number': this.EditProfileDetails.get('whatsapp_number').value,
    //       'about': this.EditProfileDetails.get('about').value,
    //       'experience' : this.EditProfileDetails.get('experience').value,
    //       'upfront_charge' : this.EditProfileDetails.get('upfront_charge').value,
    //     }


   
   
   
