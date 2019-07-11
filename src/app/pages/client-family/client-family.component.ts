import { Component, OnInit } from '@angular/core';
import {SnackService} from '../../shared/services/snack.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-family',
  templateUrl: './client-family.component.html',
  styleUrls: ['./client-family.component.scss']
})
export class ClientFamilyComponent implements OnInit {
   
    AddClientEducationalDetails: FormGroup;
    error : any;
    data : any;
    user: any = [];
    client_data:any = {
      'family_type':'',
      'hometown':'',
      'home_address':'',
      'house_type':'',
      'gotra':'',
        'mother_status' : '',
      'mother_occupation':'',
      'father_status':'',
      'father_occupation':'',
      'married_son':'',
      'unmarried_son':'',
      'married_daughter':'',
      'unmarried_daughter':'',
      'matchmaker_note':'',
    }
  
  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router : Router, public snack : SnackService,private route: ActivatedRoute) { 
      this. AddClientEducationalDetails= this._formBuilder.group({
        'family_type' : [this.client_data.family_type],
        'hometown' : [this.client_data._hometown],
        'home_address' : [this.client_data.ome_address],
        'house_type' : [this.client_data.house_type],
        'gotra' : [this.client_data.gotra],
        'mother_status' : [this.client_data.mother_status],
        'mother_occupation' : [this.client_data.other_occupation],
        'father_status' : [this.client_data.father_status],
        'father_occupation' : [this.client_data.father_occupation],
        'family_income' : [this.client_data.family_income],
        'landline' : ['na'],
        'married_son' : [this.client_data.married_son],
        'unmarried_son' : [this.client_data.unmarried_son],
        'married_daughter' : [this.client_data.married_daughter],
        'unmarried_daughter' : [this.client_data.unmarried_daughter],
        'matchmaker_note' : [this.client_data.matchmaker_note],
        'is_active' : ['1'],
      });; 
    }
  
    ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 


     if(localStorage.getItem('clientId')){

      this.http.get('http://matchmakerz.in/api/v1/client/profile?id='+this.route.snapshot.queryParamMap.get('id'),{headers : headers}).subscribe((user) => {
        this.user = user;
        console.log(this.user);
        this.client_data = user;
           // localStorage.setItem('newClientId',localStorage.getItem('clientId'));
          // localStorage.removeItem('clientId')
          console.log(this.client_data)
        localStorage.setItem('edit_client_family_type',this.user.family_type);
        localStorage.setItem('edit_client_hometown',this.user.hometown);
        localStorage.setItem('edit_client_home_address',this.user.home_address);
        localStorage.setItem('edit_client_house_type',this.user.house_type);
        localStorage.setItem('edit_client_gotra',this.user.gotra);
        localStorage.setItem('edit_client_mother_status',this.user.mother_status);
        localStorage.setItem('edit_client_mother_occupation',this.user.mother_occupation);
        localStorage.setItem('edit_client_father_status',this.user.father_status);
        localStorage.setItem('edit_client_want_father_occupation',this.user.father_occupation);
        localStorage.setItem('edit_client_family_income',this.user.family_income);
        localStorage.setItem('edit_client_landline',this.user.landline);
        localStorage.setItem('edit_client_married_son',this.user.married_son);
        localStorage.setItem('edit_client_unmarried_son',this.user.unmarried_son);
        localStorage.setItem('edit_client_married_daughter',this.user.married_daughter);
        localStorage.setItem('edit_client_unmarried_daughter',this.user.unmarried_daughter);
        localStorage.setItem('edit_client_matchmaker_note',this.user.matchmaker_note);
        localStorage.setItem('edit_client_is_active',this.user.is_active);
        if(this.client_data.family_income>1000){
          this.client_data.family_income = this.client_data.family_income/100000;
        }
  this. AddClientEducationalDetails= this._formBuilder.group({
        'family_type' : [this.client_data.family_type!==null ? (this.client_data.family_type).toString() : ''],
        'hometown' : [this.client_data.hometown],
        'home_address' : [this.client_data.home_address],
        'house_type' : [this.client_data.house_type !==null ? (this.client_data.house_type).toString() : ''],
        'gotra' : [this.client_data.gotra],
        'mother_status' : [this.client_data.mother_status!=null ? (this.client_data.mother_status).toString() : ''],
        'mother_occupation' : [this.client_data.mother_occupation!==null ?(this.client_data.mother_occupation).toString() : ''],
        'father_status' : [this.client_data.father_status!==null ? (this.client_data.father_status).toString() : ''],
        'father_occupation' : [this.client_data.father_occupation!=null ? (this.client_data.father_occupation).toString() : ''],
        'family_income' : [this.client_data.family_income],
        'landline' : ['na'],
        'married_son' : [ this.client_data.married_son !==null ? (this.client_data.married_son).toString() : ''],
        'unmarried_son' : [this.client_data.unmarried_son!=null ? (this.client_data.unmarried_son).toString() : ''],
        'married_daughter' : [ this.client_data.married_daughter!==null ? (this.client_data.married_daughter).toString() :''],
        'unmarried_daughter' : [this.client_data.unmarried_daughter !==null ? (this.client_data.unmarried_daughter).toString() : ''],
        'matchmaker_note' : [this.client_data.matchmaker_note],
        'is_active' : ['1'],
      });; 
      })
  
      }
    }
  
  
  
    addClient(){
  
      const NewProfile  = new FormData();
      NewProfile.append('id', this.route.snapshot.queryParamMap.get('id'));   
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
      NewProfile.append('married_daughter', this.AddClientEducationalDetails.value.married_daughter );
      NewProfile.append('unmarried_daughter', this.AddClientEducationalDetails.value.unmarried_daughter );
      NewProfile.append('matchmaker_note', this.AddClientEducationalDetails.value.matchmaker_note );
      NewProfile.append('is_active', "1");
      console.log(NewProfile);
  
      return this.http.post('http://matchmakerz.in/api/v1/client/client-family-update', NewProfile ,{ 
          headers : new HttpHeaders({
            'Authorization': 'Token ' + localStorage.getItem('token'),
          })}).pipe(catchError((error) => {
            return throwError("oops"); })).subscribe((response:any) => {
             this.data = response;
             console.log(this.data);
             if(this.data.status === 1){
                          this.snack.openSnackBar(this.data.message, 'success')

                this.router.navigate(['/client-preferences'],{ queryParams: { id:this.route.snapshot.queryParamMap.get('id')}});
             }
             else{
           this.snack.openSnackBar("Some Error Occure", 'required filed')
         }
         
          }),err =>{
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
          }
          
    }
  
  }
  