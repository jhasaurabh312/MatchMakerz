import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-preferences',
  templateUrl: './client-preferences.component.html',
  styleUrls: ['./client-preferences.component.scss']
})
export class ClientPreferencesComponent implements OnInit {
 
  AddClientEducationalDetails: FormGroup;
  error : any;
  data : any;
  castes: any;

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router:Router) { 
    this. AddClientEducationalDetails= this._formBuilder.group({
      'min_age' : [''],
      'max_age' : [''],
      'min_income' : [''],
      'max_income' : [''],
      'min_height' : [''],
      'max_height' : [''],
      'marital_status' : [''],
      'manglik' : [''],
      'food_choice' : [''],
      'occupation' : [''],
      'citizenship' : [''],
      'caste' : [''],
      // 'id' : [''],
    });; 
  }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 


    this.http.get('http://matchmakerz.in/api/v1/client/castes',{headers : headers}).subscribe((res) => {
      console.log(res)
      this.castes = res
 
    })
  }



  addClient(){

    const NewProfile  = new FormData();
    NewProfile.append('id', localStorage.getItem('newClientId') );   
    NewProfile.append('min_age', this.AddClientEducationalDetails.value.min_age );   
    NewProfile.append('max_age', this.AddClientEducationalDetails.value.max_age );
    NewProfile.append('min_income', this.AddClientEducationalDetails.value.min_income);
    NewProfile.append('max_income', this.AddClientEducationalDetails.value.max_income );
    NewProfile.append('min_height', this.AddClientEducationalDetails.value.min_height );
    NewProfile.append('max_height', this.AddClientEducationalDetails.value.max_height );
    NewProfile.append('marital_status', this.AddClientEducationalDetails.value.marital_status );
    NewProfile.append('manglik', this.AddClientEducationalDetails.value.marital_status );
    NewProfile.append('food_choice', this.AddClientEducationalDetails.value.food_choice );
    NewProfile.append('occupation', this.AddClientEducationalDetails.value.occupation );
    NewProfile.append('citizenship', this.AddClientEducationalDetails.value.citizenship );
    NewProfile.append('caste', this.AddClientEducationalDetails.value.caste.join() );

    localStorage.setItem('c_cp_min_age', this.AddClientEducationalDetails.value.min_age );
    localStorage.setItem('c_cp_max_age', this.AddClientEducationalDetails.value.max_age );
    localStorage.setItem('c_cp_min_income', this.AddClientEducationalDetails.value.min_income );
    localStorage.setItem('c_cp_max_income', this.AddClientEducationalDetails.value.max_income );
    localStorage.setItem('c_cp_min_height', this.AddClientEducationalDetails.value.min_height );
    localStorage.setItem('c_cp_max_height', this.AddClientEducationalDetails.value.max_height );
    localStorage.setItem('c_cp_marital_status', this.AddClientEducationalDetails.value.marital_status );
    localStorage.setItem('c_cp_manglik', this.AddClientEducationalDetails.value.manglik );
    localStorage.setItem('c_cp_food_choice', this.AddClientEducationalDetails.value.food_choice );
    localStorage.setItem('c_cp_occupation', this.AddClientEducationalDetails.value.occupation );
    localStorage.setItem('c_cp_citizenship', this.AddClientEducationalDetails.value.citizenship );
    localStorage.setItem('c_cp_caste', this.AddClientEducationalDetails.value.caste.join() );
    

    // console.log(this.AddClientEducationalDetails.value.caste.join() );

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/client/updateclientpref/' , NewProfile ,{ 
        headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
           this.data = response;
           console.log(this.data);
           if(this.data.status === 1)
            this.router.navigate(['/clients']);
         
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }

}
