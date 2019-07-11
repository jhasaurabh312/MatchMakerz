import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  SnackService
} from '../../shared/services/snack.service'

@Component({
  selector: 'app-shortlisted',
  templateUrl: './shortlisted.component.html',
  styleUrls: ['./shortlisted.component.scss']
})
export class ShortlistedComponent implements OnInit {
  shortlistedTotal: any = [];
  shortlisted: any =[];
  res:any;
  a:any;
  check : boolean;
  check1 : boolean;

  constructor(private http : HttpClient,public snack: SnackService,private routes: ActivatedRoute) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    this.http.get('http://matchmakerz.in/api/v1/client/total-shortlist?id='+this.routes.snapshot.queryParamMap.get('id'), {headers : headers}).subscribe((res) => {
      this.shortlistedTotal = res;
      console.log(this.shortlistedTotal);
   })


    this.http.get('http://matchmakerz.in/api/v1/client/shortList?id='+this.routes.snapshot.queryParamMap.get('id'), {headers : headers}).subscribe((res) => {
       this.shortlisted = res;
       console.log(this.shortlisted);

       let l = this.shortlisted.length;
       if(l==0){
         this.check1 = true;
         this.check = false;
       }
       else{
        this.check = true;
        this.check1 = false;
       }
       
 
       for(let i=0;i<l;i++){
         if(this.shortlisted[i].shortlist_to.profile_photo== null)
          {
              if (this.shortlisted[i].shortlist_to.gender===0){
                  this.shortlisted[i].shortlist_to.profile_photo= 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';

              }
              else{
                  this.shortlisted[i].shortlist_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                
              }

          } 
         if(this.shortlisted[i].shortlist_to.marital_status == '0')
          this.shortlisted[i].shortlist_to.marital = "Not Married";
         else
          this.shortlisted[i].shortlist_to.marital = "Married";
 
 
          if(this.shortlisted[i].shortlist_to.manglik == 0)
           this.shortlisted[i].shortlist_to.manglik = 'Non-Manglik';
          else
           this.shortlisted[i].shortlist_to.manglik = 'Manglik'; 
 
        
          this.shortlisted[i].shortlist_to.inches = this.shortlisted[i].shortlist_to.height % 12 ;
          this.shortlisted[i].shortlist_to.feet = (this.shortlisted[i].shortlist_to.height -  this.shortlisted[i].shortlist_to.inches)/12;
         
       } 
 
      
    })

   
  }
  DeleteShorlist(data){
    const NewProfile  = new FormData();
    NewProfile.append('shortlist_id',data);

    console.log(NewProfile);

    return this.http.put('http://matchmakerz.in/api/v1/client/shortList' , NewProfile ,{ 
           headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response);
                if (response.status === 1) {
                  this.snack.openSnackBar("successfully remove", 'success')

                } else {
                  this.snack.openSnackBar(response.message, 'error')

                }
           }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }

  }

  showInterestCandidate(data){

        this.a = this.routes.snapshot.queryParamMap.get('id');
    const Data = new FormData();
    Data.append('showInterest_for', this.a)
    Data.append('showInterest_to', data);

    console.log(data+" "+this.a);

    return this.http.post('http://matchmakerz.in/api/v1/client/showInterest', Data, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token'),
      })
    }).pipe(catchError((error) => {
      return throwError("oops");
    })).subscribe((response: any) => {
      if (response.status === 1) {
        this.snack.openSnackBar("You have shown an interest", 'success')
        // this.DeleteShorlist(data);
      } else {
        this.snack.openSnackBar(response.message, 'error')

      }

      console.log(response);
    }), err => {
      console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
    }
    }


}
