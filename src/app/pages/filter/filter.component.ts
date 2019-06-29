import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public filtered : any =[];
  EditClientPreferences: FormGroup;
  error : any;
  data : any; 
  page : number;
  a :string;
  selectedValue: any = '0';
  res : any = [];
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public route : Router) { 
    this.EditClientPreferences = this._formBuilder.group({
      'min_age' : [localStorage.getItem('min_age')],
      'max_age' : [localStorage.getItem('max_age')],
      'min_income' : [localStorage.getItem('min_income')],
      'max_income' : [localStorage.getItem('max_income')],
      'min_height' : [localStorage.getItem('min_height')],
      'max_height' : [localStorage.getItem('max_height')],
      'marital_status' : [localStorage.getItem('marital_status')],
      'manglik' : [localStorage.getItem('manglik')],
      'food_choice' : [localStorage.getItem('food_choice')],
      'occupation' : [localStorage.getItem('occupation')],
      'citizenship' : [localStorage.getItem('citizenship')],
      'caste' : [localStorage.getItem('caste')],
      'gender' : ['1'],
    });;
   
  }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

    this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res) => {
      this.res = res;
      console.log((this.res));
      var cast_prefer = '';
      this.res.caste.map((value, index) => {
        // console.log(value)
        cast_prefer+=(value['id'])+','
      })
      cast_prefer+='0';

      localStorage.setItem('min_age',(this.res.min_age).split('-')[0]);
      localStorage.setItem('max_age',(this.res.max_age).split('-')[0]);
      localStorage.setItem('min_income',this.res.min_income);
      ((localStorage.setItem('max_income',this.res.max_income)));
      ((localStorage.setItem('min_height',this.res.min_height)));
      ((localStorage.setItem('max_height',this.res.max_height)));
      ((localStorage.setItem('marital_status',this.res.marital_status)));
      ((localStorage.setItem('manglik',this.res.manglik)));
      ((localStorage.setItem('food_choice',this.res.food_choice)));
      ((localStorage.setItem('occupation',this.res.occupation)));
      ((localStorage.setItem('caste',cast_prefer)));
      if(this.res.gender===1)
        ((localStorage.setItem('prgender', '0')));
      else{
        ((localStorage.setItem('prgender', '1')));

      }
    })

     

  }


  ApplyFilter(){

      localStorage.setItem('page','1'); 
      localStorage.setItem('min_age',this.EditClientPreferences.value.min_age);  
      localStorage.setItem('max_age',this.EditClientPreferences.value.max_age);   
      localStorage.setItem('min_income',this.EditClientPreferences.value.min_income);   
      localStorage.setItem('max_income',this.EditClientPreferences.value.max_income);   
      localStorage.setItem('min_height',this.EditClientPreferences.value.min_height);   
      localStorage.setItem('max_height',this.EditClientPreferences.value.max_height);   
      localStorage.setItem('marital_status',this.EditClientPreferences.value.marital_status);          
      localStorage.setItem('manglik',this.EditClientPreferences.value.manglik);   
      localStorage.setItem('food_choice',this.EditClientPreferences.value.food_choice);   
      localStorage.setItem('occupation',this.EditClientPreferences.value.occupation);   
      localStorage.setItem('citizenship',this.EditClientPreferences.value.citizenship);   
      localStorage.setItem('caste',this.EditClientPreferences.value.caste);   
      localStorage.setItem('gender',this.EditClientPreferences.value.gender);   
      
      this.route.navigate(['/matches']);
  
  }

}
