import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.scss']
})
export class EducationalDetailsComponent implements OnInit {

  
  AddClientEducationalDetails: FormGroup;
  error : any;
  data : any;

  constructor(private _formBuilder: FormBuilder, private http : HttpClient) { 
    this. AddClientEducationalDetails= this._formBuilder.group({
      'is_working' : [''],
      'education' : ['NA'],
      'degree' : [''],
      'college' : [''],
      'occupation' : [''],
      'sub_occupation' : [''],
      'office_address' : [''],
      'yearly_income' : [''],
      
    });; 
  }

  ngOnInit() {
  }



  addClient(){

    const NewProfile  = new FormData();
    NewProfile.append('id', localStorage.getItem('newClientId') );   
    NewProfile.append('is_working', this.AddClientEducationalDetails.value.is_working );   
    NewProfile.append('degree', this.AddClientEducationalDetails.value.degree);
    NewProfile.append('college', this.AddClientEducationalDetails.value.college );
    NewProfile.append('occupation', this.AddClientEducationalDetails.value.occupation );
    NewProfile.append('sub_occupation', this.AddClientEducationalDetails.value.sub_occupation );
    NewProfile.append('office_address', this.AddClientEducationalDetails.value.office_address );
    NewProfile.append('yearly_income', this.AddClientEducationalDetails.value.yearly_income );
    NewProfile.append('education','NA');
   

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/client/client-career-update' , NewProfile ,{ 
        headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
           this.data = response;
           console.log(this.data);
           if(this.data.status === 1)
            window.location.replace('/social-details');
         
        }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
        
  }

}
