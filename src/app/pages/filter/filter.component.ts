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
selectedValue: any = '0'
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public route : Router) { 
    this.EditClientPreferences = this._formBuilder.group({
      'min_age' : [localStorage.getItem('c_cp_min_age')],
      'max_age' : [localStorage.getItem('c_cp_max_age')],
      'min_income' : [localStorage.getItem('c_cp_min_income')],
      'max_income' : [localStorage.getItem('c_cp_max_income')],
      'min_height' : [localStorage.getItem('c_cp_min_height')],
      'max_height' : [localStorage.getItem('c_cp_max_height')],
      'marital_status' : [localStorage.getItem('c_cp_marital_status')],
      'manglik' : [localStorage.getItem('c_cp_manglik')],
      'food_choice' : [localStorage.getItem('c_cp_food_choice')],
      'occupation' : [localStorage.getItem('c_cp_occupation')],
      'citizenship' : [localStorage.getItem('c_cp_citizenship')],
      'caste' : [localStorage.getItem('c_cp_caste')],
      'gender' : ['1'],
    });;
   
  }
//   castes:[
// {id:'1', name:'Aggarwal'},
// {id:'2', name:'Jat'},
// {id:'3', name:'Punjabi'}
//   ]


  ngOnInit() {

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
