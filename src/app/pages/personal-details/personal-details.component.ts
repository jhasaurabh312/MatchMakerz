import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EditProfileService } from 'src/app/shared/services/editProfile/edit-profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {


  AddClientDetails: FormGroup;
  error : any;
  data : any;
 startDate = new Date(1970, 0, 1);
  constructor(private _formBuilder: FormBuilder, private http : HttpClient , public router : Router) { 
    this. AddClientDetails= this._formBuilder.group({
      'name' : [''],
      'gender' : [''],
      'whatsapp_number' : [''],
      'phone_number' : [''],
      'height' : [''],
      'birth_date' : [''],
      'birth_place' : [''],
      'weight' : [''],
      'birth_time' : [''],
      'current_city' : [''],
      'food_choice' : [''],
      'disability' : [''],
      'disabled_part' : [''],
    });; 
  }

  ngOnInit() {
   
  }

  addClient(){

    const NewProfile  = new FormData();
   
    NewProfile.append('name', this.AddClientDetails.value.name );   
    NewProfile.append('phone_number', this.AddClientDetails.value.phone_number );
    NewProfile.append('gender', this.AddClientDetails.value.gender);
    NewProfile.append('whatsapp_number', this.AddClientDetails.value.whatsapp_number );
    NewProfile.append('height', this.AddClientDetails.value.height );
    NewProfile.append('birth_date', this.AddClientDetails.value.birth_date );
    NewProfile.append('birth_place', this.AddClientDetails.value.birth_place );
    NewProfile.append('weight', this.AddClientDetails.value.weight );
    NewProfile.append('birth_time', this.AddClientDetails.value.birth_time );
    NewProfile.append('current_city', this.AddClientDetails.value.current_city );
    NewProfile.append('food_choice', this.AddClientDetails.value.food_choice );
    NewProfile.append('disability', this.AddClientDetails.value.disability );
    NewProfile.append('disabled_part', this.AddClientDetails.value.disabled_part );

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/client/registerClient' , NewProfile ,{ 
        headers : new HttpHeaders({

          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response)
           this.data = response;
           if(this.data.status === 1){
             localStorage.setItem('newClientId' ,this.data.id);
             this.router.navigate(['/educational-details']);
           }
           
         
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }

  filter(){
    
  }

}
   
   
