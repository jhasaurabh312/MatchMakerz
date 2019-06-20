import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FilterComponent } from '../filter/filter.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  staticProductDetail : any = [];
  response : any ;
  min_age: number;
  max_age: number;
  min_income : number;
  max_income : number;
  min_height: number ;
  max_height: number;
  marital_status: number;
  manglik: number;
  food_choice:number;
  occupation: number;
  citizenship: number;
  caste: number;
  gender: number;

  constructor(private http : HttpClient, private filtercomp: FilterComponent, public route : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

    this.min_age = parseInt((localStorage.getItem('min_age')));
    this.max_age = parseInt((localStorage.getItem('max_age')));
    this.min_income = parseInt((localStorage.getItem('min_income')));
    this.max_income = parseInt((localStorage.getItem('max_income')));
    this.min_height = parseInt((localStorage.getItem('min_height')));
    this.max_height = parseInt((localStorage.getItem('max_height')));
    this.marital_status = parseInt((localStorage.getItem('marital_status')));
    this.manglik = parseInt((localStorage.getItem('manglik')));
    this.food_choice = parseInt((localStorage.getItem('food_choice')));
    this.occupation = parseInt((localStorage.getItem('occupation')));
    this.citizenship = parseInt((localStorage.getItem('citizenship')));
    this.caste = parseInt((localStorage.getItem('caste')));
    this.gender = parseInt((localStorage.getItem('gender')));

    let  URL = 'http://matchmakerz.in/api/v1/client/filterMatches?page='+localStorage.getItem('page')
                +'&min_age='+(2019-this.min_age)
                +'&max_age='+(2019-this.max_age)
                +'&min_income='+this.min_income
                +'&max_income='+this.max_income
                +'&min_height='+this.min_height
                +'&max_height='+this.max_height
                +'&marital_status='+this.marital_status
                +'&manglik='+this.manglik
                +'&food_choice='+this.food_choice
                +'&occupation='+this.occupation
                +'&citizenship='+this.citizenship
                +'&caste='+this.caste
                +'&gender='+this.gender

                this.http.get(URL, {headers : headers}).subscribe((response) =>{
                  this.response = response;
                  this.staticProductDetail = this.response.results;
                  console.log(this.staticProductDetail);
            })
  }


  filter(){
    this.route.navigate(['/filter']);
  }


}
