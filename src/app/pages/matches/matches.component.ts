import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FilterComponent } from '../filter/filter.component'
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  shortlistedTotal: any = [];
  staticProductDetail : any = [];
  a : any;
  response : any ;
  res : any = [];
  // min_age: number;
  // max_age: number;
  // min_income : number;
  // max_income : number;
  // min_height: number ;
  // max_height: number;
  // marital_status: number;
  // manglik: number;
  // food_choice:number;
  // occupation: number;
  // citizenship: number;
  // caste: number;
  // gender: number;

  constructor(private http : HttpClient, private filtercomp: FilterComponent, public route : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

    this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res) => {
      this.res = res;
      console.log(this.res);
      localStorage.setItem('min_age',this.res.min_age);
      localStorage.setItem('max_age',this.res.max_age);
      localStorage.setItem('min_income',this.res.min_income);
      ((localStorage.setItem('max_income',this.res.max_income)));
      ((localStorage.setItem('min_height',this.res.min_height)));
      ((localStorage.setItem('max_height',this.res.max_height)));
      ((localStorage.setItem('marital_status',this.res.marital_status)));
      ((localStorage.setItem('manglik',this.res.manglik)));
      ((localStorage.setItem('food_choice',this.res.food_choice)));
      ((localStorage.setItem('occupation',this.res.occupation)));
      ((localStorage.setItem('citizenship',this.res.citizenship )));
      ((localStorage.setItem('caste',this.res.caste)));
      ((localStorage.setItem('gender', this.res.gender)));
    })



   

    let  URL = 'http://matchmakerz.in/api/v1/client/filterMatches?page='+localStorage.getItem('page')
                +'&min_age='+localStorage.getItem('min_age')
                +'&max_age='+localStorage.getItem('max_age')
                +'&min_income='+localStorage.getItem('min_income')
                +'&max_income='+localStorage.getItem('max_income')
                +'&min_height='+localStorage.getItem('min_height')
                +'&max_height='+localStorage.getItem('max_height')
                +'&marital_status='+localStorage.getItem('marital_status')
                +'&manglik='+localStorage.getItem('food_choice')
                +'&food_choice='+localStorage.getItem('food_choice')
                +'&occupation='+localStorage.getItem('occupation')
                +'&citizenship='+localStorage.getItem('citizenship')
                +'&caste='+localStorage.getItem('caste')
                +'&gender='+localStorage.getItem('gender')

                this.http.get(URL, {headers : headers}).subscribe((response) =>{
                  this.response = response;
                  this.staticProductDetail = this.response.results;
                  console.log(this.staticProductDetail);

                  for(let i=0;i<this.staticProductDetail.length;i++){
                    if(this.staticProductDetail[i].profile_photo== null)
                    this.staticProductDetail[i].profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';
            
                    if(this.staticProductDetail[i].marital_status == '0')
                     this.staticProductDetail[i].marital = "Not Married";
                    else
                     this.staticProductDetail[i].marital = "Married";
            
            
                     if(this.staticProductDetail[i].manglik == 0)
                      this.staticProductDetail[i].manglik = 'Non-Manglik';
                     else
                      this.staticProductDetail[i].manglik = 'Manglik'; 
            
                   
                     this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
                     this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
                    
                  } 
            
            })

            this.http.get('http://matchmakerz.in/api/v1/client/total-shortlist?id='+localStorage.getItem('clientId'), {headers : headers}).subscribe((res) => {
            this.shortlistedTotal = res;
            console.log(this.shortlistedTotal);
   })
  }


  filter(){
    this.route.navigate(['/filter']);
  }


  shortlistCandidate(data){
    this.a = parseInt(localStorage.getItem('clientId'));
    const NewProfile  = new FormData();

    NewProfile.append('shortlist_to',data);
    NewProfile.append('shortlist_for',this.a);

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/client/shortList' , NewProfile ,{ 
           headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response);
           }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
  }


  showInterestCandidate(data){

    this.a = parseInt(localStorage.getItem('clientId'));
    const Data  = new FormData();
    Data.append('showInterest_for',this.a)
    Data.append('showInterest_to',data);

    console.log(Data);

    return this.http.post('http://matchmakerz.in/api/v1/client/showInterest' , Data ,{ 
           headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response);
           }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
  }

  getshortlisted(){
    this.route.navigate(['/shortlisted']);
  }



}
