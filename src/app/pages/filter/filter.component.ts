import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  constructor(private _formBuilder: FormBuilder, private http : HttpClient) { 
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
    localStorage.setItem('page','1'); 
  }


  ngOnInit() {

  }


  ApplyFilter(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

    console.log(this.EditClientPreferences.value.min_age);

    let  URL = 'http://matchmakerz.in/api/v1/client/filterMatches?page='+ localStorage.getItem('page')
                +'&min_age='+this.EditClientPreferences.value.min_age
                +'&max_age='+this.EditClientPreferences.value.max_age
                +'&min_income='+this.EditClientPreferences.value.min_income
                +'&max_income='+this.EditClientPreferences.value.max_income
                +'&min_height='+this.EditClientPreferences.value.min_height
                +'&max_height='+this.EditClientPreferences.value.max_height
                +'&marital_status='+this.EditClientPreferences.value.marital_status
                +'&manglik='+this.EditClientPreferences.value.manglik
                +'&food_choice='+this.EditClientPreferences.value.food_choice
                +'&occupation='+this.EditClientPreferences.value.occupation
                +'&citizenship='+this.EditClientPreferences.value.citizenship
                +'&caste='+this.EditClientPreferences.value.caste
                +'&gender='+this.EditClientPreferences.value.gender


    return this.http.get(URL, {headers : headers}).subscribe((response) =>{
      this.filtered = response;
      console.log(this.filtered);
      let page = localStorage.getItem('page')+1;
      localStorage.setItem('page', page);
    })
 
  }

}
