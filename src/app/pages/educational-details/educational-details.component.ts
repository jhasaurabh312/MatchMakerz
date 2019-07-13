import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {SnackService} from '../../shared/services/snack.service'

@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.scss']
})
export class EducationalDetailsComponent implements OnInit {

  
  AddClientEducationalDetails: FormGroup;
  error : any;
  data : any;
  user : any;
  degree:any;
  client_data :any = {
    'is_working':'',
    'degree':'',
      'college' : '',
    'occupation':'',
    'sub_occupation':'',
    'office_address':'',
    'yearly_income':'',
  }
  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router : Router, public snack : SnackService, private route: ActivatedRoute) { 
   console.log(this.client_data)
    this. AddClientEducationalDetails= this._formBuilder.group({
      'is_working' : [this.client_data.is_working ? '1': '0'],
      'education' : ['NA'],
      'degree' : [this.client_data.degree_id],
      'college' : [this.client_data.college],
      'occupation' : [this.client_data.ccupation],
      'sub_occupation' : [this.client_data.occupation],
      'office_address' : [this.client_data.office_address],
      'yearly_income' : [this.client_data.yearly_income],
      
    });; 
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

   // if(localStorage.getItem('clientId')){
          this.http.get('http://matchmakerz.in/api/v1/client/degree',{headers : headers}).subscribe((res) => {
            console.log(res)
            this.degree = res;
          })

       this.http.get('http://matchmakerz.in/api/v1/client/profile?id='+ this.route.snapshot.queryParamMap.get('id'),{headers : headers}).subscribe((user) => {
         this.user = user;
         console.log(this.user);
         this.client_data = user;
         console.log(this.client_data)
         // localStorage.setItem('newClientId',localStorage.getItem('clientId'));
      // localStorage.removeItem('clientId')

         localStorage.setItem('edit_client_is_working',this.user.is_working);
         localStorage.setItem('edit_client_degree',this.user.degree_id);
         localStorage.setItem('edit_client_college',this.user.college);
         localStorage.setItem('edit_client_occupation',this.user.occupation);
         localStorage.setItem('edit_client_sub_occupation',this.user.sub_occupation);
         localStorage.setItem('edit_client_office_address',this.user.office_address);
         localStorage.setItem('edit_client_yearly_income',this.user.yearly_income);
          this. AddClientEducationalDetails= this._formBuilder.group({
          'is_working' : [this.client_data.is_working ? '1': '0'],
          'education' : ['NA'],
          'degree' : [this.client_data.degree_id],
          'college' : [this.client_data.college],
          'occupation' : [this.client_data.occupation  !==null ? (this.client_data.occupation).toString():''],
          'sub_occupation' : [this.client_data.sub_occupation],
          'office_address' : [this.client_data.office_address],
          'yearly_income' : [this.client_data.yearly_income],
          
        });; 
       })
     // }


  }



  addClient(){

    const NewProfile  = new FormData();
    NewProfile.append('id', this.route.snapshot.queryParamMap.get('id'));   
    NewProfile.append('is_working', this.AddClientEducationalDetails.value.is_working );   
    NewProfile.append('degree', this.AddClientEducationalDetails.value.degree);
    NewProfile.append('college', this.AddClientEducationalDetails.value.college );
    NewProfile.append('occupation', this.AddClientEducationalDetails.value.occupation );
    NewProfile.append('sub_occupation', this.AddClientEducationalDetails.value.sub_occupation );
    NewProfile.append('office_address', this.AddClientEducationalDetails.value.office_address );
    NewProfile.append('yearly_income', this.AddClientEducationalDetails.value.yearly_income );
    NewProfile.append('education','NA');
   

    // console.log(localStorage.getItem('newClientId')); 
    console.log(this.AddClientEducationalDetails.value)

    return this.http.post('http://matchmakerz.in/api/v1/client/client-career-update' , NewProfile ,{ 
        headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
           this.data = response;
           console.log(this.data);
           if(this.data.status === 1){
                                       this.snack.openSnackBar(this.data.message, 'success')

             this.router.navigate(['/social-details'],{ queryParams: { id:this.route.snapshot.queryParamMap.get('id')}});
           }
         else{
           this.snack.openSnackBar("Some error occured", 'error')
         }
         
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }

}
