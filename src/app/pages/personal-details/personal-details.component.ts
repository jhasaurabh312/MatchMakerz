import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EditProfileService } from 'src/app/shared/services/editProfile/edit-profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import {SnackService} from '../../shared/services/snack.service'

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
  birth : any = [] ;
  values : any = [];
  suc : any = [];
  apiKey:string='AIzaSyCoWnTuLuqqx-SLvnv4gH6UHcC_Sr9KysU';

  constructor(private _formBuilder: FormBuilder, private http : HttpClient , public snack : SnackService,private route: ActivatedRoute,  public router : Router) { 
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
    // NewProfile.append('birth_date', this.AddClientDetails.value.birth_date );
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

    return this.http.post('http://matchmakerz.in/api/v1/client/registerClient' , NewProfile ,{ 
        headers : new HttpHeaders({

          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response)
           this.data = response;
           if(this.data.status === 1){
                               this.snack.openSnackBar(this.data.message, 'success')
              var my_clients = localStorage.getItem('my_clients').split(',')
              my_clients.push(this.data.id)
                          localStorage.setItem('my_clients', my_clients.toString());


             localStorage.setItem('newClientId' ,this.data.id);
             this.router.navigate(['/educational-details'],{ queryParams: { id:this.data.id}});
           }
else{
                            this.snack.openSnackBar(this.data.message, 'error')

}           
         
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }


  getlocation(){

    // const headers = new HttpHeaders({
    //   'Content-Type': 'Application/json',
      
    // })

    this.values = this.AddClientDetails.value.current_city ;
    console.log(this.values);
    return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+this.values+'&key='+this.apiKey).subscribe((suc) => {
      this.suc=suc;
      console.log(this.suc);
    })
  }

}
   
   
