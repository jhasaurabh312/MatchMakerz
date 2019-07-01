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
  load_more = false;
  shortlistedTotal: any = [];
  staticProductDetail : any = [];
  a : any;
  response : any ;
  res : any = [];
  show : boolean;
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

  constructor(private http : HttpClient, private filtercomp: FilterComponent, public route : Router) { 
    localStorage.setItem('page','1');
  }
  getData(){
     
    this.show= false;
    this.load_more=true;
     let  URL = 'http://matchmakerz.in/api/v1/client/filterMatches?page='+localStorage.getItem('page')
                if(localStorage.getItem('min_age') !== null){
                 URL +='&min_age='+localStorage.getItem('min_age')
                 // localStorage.removeItem('min_age')
                }

                if(localStorage.getItem('max_age') !== null){
                URL +='&max_age='+localStorage.getItem('max_age')
                                 // localStorage.removeItem('max_age')

              }

                if(localStorage.getItem('min_income') !== null){
                  URL +='&min_income='+localStorage.getItem('min_income')
                                 // localStorage.removeItem('min_income')

              }

                if(localStorage.getItem('max_income') !== null){
                URL +='&max_income='+localStorage.getItem('max_income')
                                 // localStorage.removeItem('max_income')

              }

                if (localStorage.getItem('min_height') !== null){
                  URL +='&min_height='+localStorage.getItem('min_height')
                                               // localStorage.removeItem('min_height')

              }
  
                if(localStorage.getItem('max_height') !== null){
                  URL +='&max_height='+localStorage.getItem('max_height')
                                 // localStorage.removeItem('max_height')

              }

                if(localStorage.getItem('marital_status') !== null){
                  URL +='&marital_status='+localStorage.getItem('marital_status')
                                             // localStorage.removeItem('marital_status')
                

              }

                if(localStorage.getItem('manglik') !== null) {
                  URL +='&manglik='+localStorage.getItem('manglik')

                                 // localStorage.removeItem('manglik')

              }
              if(localStorage.getItem('food_choice') !== null){
                URL +='&food_choice='+localStorage.getItem('food_choice')
                                 // localStorage.removeItem('food_choice')

              }

              if(localStorage.getItem('occupation') !== null){
                URL +='&occupation='+localStorage.getItem('occupation')

                                 // localStorage.removeItem('occupation')

              }
              if(localStorage.getItem('caste') !== null){
                URL +='&caste='+localStorage.getItem('caste')

                                 // localStorage.removeItem('caste')

              }
              if(localStorage.getItem('prgender') !== null){
                URL +='&gender='+localStorage.getItem('prgender')

                                 // localStorage.removeItem('prgender')
              }
              const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
              }) 
              localStorage.setItem('filter','0')
                console.log(URL)
                this.http.get(URL, {headers : headers}).subscribe((response) =>{
                  this.response = response;
                  this.staticProductDetail = [...this.staticProductDetail, ...this.response.results];
                  console.log(console.log(response));

                  let l = this.staticProductDetail.length;
                    if(l<20)
                    this.show = false;
                    else
                    this.show = true; 

                  if(this.response.links.next === 'null'){
                    this.show = false;
                    this.load_more = false;

                        localStorage.removeItem('min_age')
                

                                 localStorage.removeItem('max_age')
                                 localStorage.removeItem('min_income')

                                 localStorage.removeItem('max_income')

                                               localStorage.removeItem('min_height')

                                 localStorage.removeItem('max_height')

                                             localStorage.removeItem('marital_status')
                

                                 localStorage.removeItem('manglik')

                                 localStorage.removeItem('food_choice')


                                 localStorage.removeItem('occupation')


                                 localStorage.removeItem('caste')

              }
              if(localStorage.getItem('prgender') !== null){
                URL +='&gender='+localStorage.getItem('prgender')

                                 localStorage.removeItem('prgender')

                  }

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
    this.show = true;
    this.load_more=false;


  }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 
    if(localStorage.getItem('filter') === '0'){
      console.log("888888")
       this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res) => {
      this.res = res;
      console.log((this.res));
      var cast_prefer = '';
      this.res.caste.map((value, index) => {
        // console.log(value)
        cast_prefer+=(value['id'])+','
      })
      cast_prefer+='0';
      if(this.res.min_age !== null)
        localStorage.setItem('min_age',(this.res.min_age).split('-')[0]);

      if(this.res.max_age !== null)
        localStorage.setItem('max_age',(this.res.max_age).split('-')[0]);

      if(this.res.min_income !== null)
        localStorage.setItem('min_income',this.res.min_income);

      if(this.res.max_income !== null)
      ((localStorage.setItem('max_income',this.res.max_income)));

      if (this.res.min_height !== null)
        ((localStorage.setItem('min_height',this.res.min_height)));

      if (this.res.max_height !== null)
        ((localStorage.setItem('max_height',this.res.max_height)));

      if (this.res.marital_status !== null)
        ((localStorage.setItem('marital_status',this.res.marital_status)));

      if(this.res.manglik !== null)
        ((localStorage.setItem('manglik',this.res.manglik)));

      if(this.res.food_choice !== null)
        ((localStorage.setItem('food_choice',this.res.food_choice)));

      if(this.res.citizenship !== null)
        ((localStorage.setItem('citizenship',this.res.citizenship)));

      if(this.res.occupation !== null)
        ((localStorage.setItem('occupation',this.res.occupation)));
      if(cast_prefer !== null)
        ((localStorage.setItem('caste',cast_prefer)));

      // if(this.res.gender === 1)
      //   ((localStorage.setItem('prgender', this.res.gender)));
        if(localStorage.getItem('gender')==='0'){
                  ((localStorage.setItem('prgender', '1')));

        }
        else{
          ((localStorage.setItem('prgender', '0')));

        }
      })

    }


     this.getData()

    this.show= true;
    this.load_more=false;
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

  filter(){
    this.route.navigate(['/filter'])
  }

  getProfile(data){
    localStorage.setItem('clientId' , data);
    this.route.navigate(['/client-profile']);
  }
  GetMore(){
    console.log("********")
    this.show = false;
    this.load_more=true;
    var page = parseInt(localStorage.getItem('page'))+1
    localStorage.setItem('page', page.toString())
    this.getData();
  }

}
