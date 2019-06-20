import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-family',
  templateUrl: './client-family.component.html',
  styleUrls: ['./client-family.component.scss']
})
export class ClientFamilyComponent implements OnInit {
   
    AddClientEducationalDetails: FormGroup;
    error : any;
    data : any;
  
    constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router: Router) { 
      this. AddClientEducationalDetails= this._formBuilder.group({
        'family_type' : [''],
        'hometown' : [''],
        'home_address' : [''],
        'house_type' : [''],
        'gotra' : [''],
        'mother_status' : [''],
        'mother_occupation' : [''],
        'father_status' : [''],
        'father_occupation' : [''],
        'family_income' : [''],
        'landline' : [''],
        'married_son' : [''],
        'unmarried_son' : [''],
        'married_daughter' : [''],
        'unmarried_daughter' : [''],
        'matchmaker_note' : [''],
        'is_active' : [''],
        // 'id' : [''],
      });; 
    }
  
    ngOnInit() {
      
    }
  
  
  
    addClient(){
  
      const NewProfile  = new FormData();
      NewProfile.append('id', localStorage.getItem('newClientId') );   
      NewProfile.append('family_type', this.AddClientEducationalDetails.value.family_type );   
      NewProfile.append('hometown', this.AddClientEducationalDetails.value.hometown );
      NewProfile.append('home_address', this.AddClientEducationalDetails.value.home_address);
      NewProfile.append('house_type', this.AddClientEducationalDetails.value.house_type );
      NewProfile.append('gotra', this.AddClientEducationalDetails.value.gotra );
      NewProfile.append('mother_status', this.AddClientEducationalDetails.value.mother_status );
      NewProfile.append('mother_occupation', this.AddClientEducationalDetails.value.mother_occupation );
      NewProfile.append('father_status', this.AddClientEducationalDetails.value.father_status );
      NewProfile.append('father_occupation', this.AddClientEducationalDetails.value.father_occupation );
      NewProfile.append('family_income', this.AddClientEducationalDetails.value.family_income );
      NewProfile.append('landline', this.AddClientEducationalDetails.value.landline );
      NewProfile.append('married_son', this.AddClientEducationalDetails.value.married_son );
      NewProfile.append('unmarried_son', this.AddClientEducationalDetails.value.unmarried_son );
      NewProfile.append('married_daughter', this.AddClientEducationalDetails.value.unmarried_daughter );
      NewProfile.append('unmarried_daughter', this.AddClientEducationalDetails.value.unmarried_daughter );
      NewProfile.append('matchmaker_note', this.AddClientEducationalDetails.value.matchmaker_note );
      NewProfile.append('is_active', this.AddClientEducationalDetails.value.is_active );
      console.log(NewProfile);
  
      return this.http.post('http://matchmakerz.in/api/v1/client/client-family-update?id='+localStorage.getItem('newClientId') , NewProfile ,{ 
          headers : new HttpHeaders({
            'Authorization': 'Token ' + localStorage.getItem('token'),
          })}).pipe(catchError((error) => {
            return throwError("oops"); })).subscribe((response:any) => {
             this.data = response;
             console.log(this.data);
             if(this.data.status === 1)
              this.router.navigate(['/client-preferences']);
           
          }),err =>{
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
          }
          
    }
  
  }
  