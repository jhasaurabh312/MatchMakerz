import { Component, OnInit } from '@angular/core';
import {SnackService} from '../../shared/services/snack.service'
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EditProfileService } from 'src/app/shared/services/editProfile/edit-profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-personal',
  templateUrl: './edit-personal.component.html',
  styleUrls: ['./edit-personal.component.scss']
})
export class EditPersonalComponent implements OnInit {

  AddClientDetails: FormGroup;
  error : any;
  data : any;
  startDate = new Date(1970, 0, 1);
  birth : any = [] ;
  values : any = [];
  suc : any = [];
  apiKey:string='AIzaSyCoWnTuLuqqx-SLvnv4gH6UHcC_Sr9KysU';
  user : any = [];
  client_id:any;

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router : Router,private route: ActivatedRoute, public snack : SnackService) { 
    this. AddClientDetails= this._formBuilder.group({
      'name' : [localStorage.getItem('edit_client_name')],
      'gender' : [localStorage.getItem('edit_client_gender')],
      'whatsapp_number' : [localStorage.getItem('edit_client_whatsapp_number')],
      'phone_number' : [localStorage.getItem('edit_client_phone_number')],
      'height' : [localStorage.getItem('edit_client_height')],
      'birth_date' : [localStorage.getItem('edit_client_birth_date')],
      'birth_place' : [localStorage.getItem('edit_client_birth_place')],
      'weight' : [localStorage.getItem('edit_client_weight')],
      'birth_time' : [localStorage.getItem('edit_client_birth_time')],
      'current_city' : [localStorage.getItem('edit_client_current_city')],
      'food_choice' : [localStorage.getItem('edit_client_food_choice')],
      'disability' : [localStorage.getItem('edit_client_disability')],
      'disabled_part' : [localStorage.getItem('edit_client_disabled_part')],
    });; 
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

   // if(localStorage.getItem('clientId')){
     this.client_id = this.route.snapshot.queryParamMap.get('id');
    this.http.get('http://matchmakerz.in/api/v1/client/profile?id='+this.route.snapshot.queryParamMap.get('id'),{headers : headers}).subscribe((user) => {
      this.user = user;
      console.log(this.user);

      // localStorage.setItem('clientProfileId',localStorage.getItem('clientId'));
      // localStorage.removeItem('clientId')
      localStorage.setItem('edit_client_name',this.user.name);
      localStorage.setItem('edit_client_phone_number',this.user.phone_number);
      localStorage.setItem('edit_client_whatsapp_number',this.user.whatsapp_number);
      localStorage.setItem('edit_client_gender',this.user.gender);
      localStorage.setItem('edit_client_height',this.user.height);
      localStorage.setItem('edit_client_birth_date',this.user.birth_date);
      localStorage.setItem('edit_client_birth_time',this.user.birth_time);
      localStorage.setItem('edit_client_weight',this.user.weight);
      localStorage.setItem('edit_client_current_city',this.user.current_city);
      localStorage.setItem('edit_client_birth_place',this.user.birth_place);
      localStorage.setItem('edit_client_food_choice',this.user.food_choice);
      localStorage.setItem('edit_client_disability',this.user.disability);
      localStorage.setItem('edit_client_disabled_part',this.user.disabled_part);
        this. AddClientDetails= this._formBuilder.group({
      'name' : [localStorage.getItem('edit_client_name')],
      'gender' : [localStorage.getItem('edit_client_gender')],
      'whatsapp_number' : [localStorage.getItem('edit_client_whatsapp_number')],
      'phone_number' : [localStorage.getItem('edit_client_phone_number')],
      'height' : [localStorage.getItem('edit_client_height')],
      'birth_date' : [localStorage.getItem('edit_client_birth_date')],
      'birth_place' : [localStorage.getItem('edit_client_birth_place')],
      'weight' : [localStorage.getItem('edit_client_weight')],
      'birth_time' : [localStorage.getItem('edit_client_birth_time')],
      'current_city' : [localStorage.getItem('edit_client_current_city')],
      'food_choice' : [localStorage.getItem('edit_client_food_choice')],
      'disability' : [localStorage.getItem('edit_client_disability')],
      'disabled_part' : [localStorage.getItem('edit_client_disabled_part')],
    });; 
    })
  // }



  }

  addClient(){

    const NewProfile  = new FormData();
    NewProfile.append('id',this.route.snapshot.queryParamMap.get('id'));  
    NewProfile.append('name', this.AddClientDetails.value.name );   
    NewProfile.append('phone_number', this.AddClientDetails.value.phone_number );
    NewProfile.append('gender', this.AddClientDetails.value.gender);
    NewProfile.append('whatsapp_number', this.AddClientDetails.value.whatsapp_number );
    NewProfile.append('height', this.AddClientDetails.value.height );
    NewProfile.append('birth_place', this.AddClientDetails.value.birth_place );
    NewProfile.append('weight', this.AddClientDetails.value.weight );
    NewProfile.append('birth_time', this.AddClientDetails.value.birth_time );
    NewProfile.append('current_city', this.AddClientDetails.value.current_city );
    NewProfile.append('food_choice', this.AddClientDetails.value.food_choice );
    NewProfile.append('disability', this.AddClientDetails.value.disability );
    NewProfile.append('disabled_part', this.AddClientDetails.value.disabled_part );

    
    // toISOString().slice(0,10)
     

     var date = new Date(this.AddClientDetails.value.birth_date)
       var  dob = date.toISOString().slice(0,10).toString();
             NewProfile.append('birth_date',dob.toString()) ;

    console.log(NewProfile.get('birth_date'));

    return this.http.post('http://matchmakerz.in/api/v1/client/updateclient/' , NewProfile ,{ 
        headers : new HttpHeaders({

          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response)
           this.data = response;
           if(this.data.status === 1){
                       this.snack.openSnackBar(this.data.message, 'success')

             localStorage.setItem('newClientId' ,localStorage.getItem('clientProfileId'));
             this.router.navigate(['/educational-details'],{ queryParams: { id:this.route.snapshot.queryParamMap.get('id')}});
           }
            else{
           this.snack.openSnackBar("Some Error Occure", 'required filed')
         }
           
         
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }

}
