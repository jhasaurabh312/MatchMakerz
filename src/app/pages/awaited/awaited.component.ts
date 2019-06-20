import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-awaited',
  templateUrl: './awaited.component.html',
  styleUrls: ['./awaited.component.scss']
})
export class AwaitedComponent implements OnInit {
  public show1 : Boolean = true;
  public show2 : Boolean = false;
  public awaitedIn : any = [];
  public awaitedOut : any = [];
  constructor(private http : HttpClient, public router : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/incoming-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.awaitedIn = response;
       console.log(this.awaitedIn)
     })

     this.http.get('http://matchmakerz.in/api/v1/client/awaited-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
      this.awaitedOut = response;
      console.log(this.awaitedOut)
     
    })
  
  }

   
  awaited(){
    this.router.navigate(['/awaited']);
  }


  connected(){
    this.router.navigate(['/connected']);
  }


  declined(){
    this.router.navigate(['/declined']);
  }

  shortlistCandidate(data1, data2){

    const NewProfile  = new FormData();

    NewProfile.append('shortlist_for',data1);
    NewProfile.append('shortlist_to',data2);

    return this.http.post('http://matchmakerz.in/api/v1/client/shortlist' , NewProfile ,{ 
           headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response);
           }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
  }


  showActivityCandidate(data1,data2){
    const NewProfile  = new FormData();

    NewProfile.append('shortlist_for',data1);
    NewProfile.append('shortlist_to',data2);

    return this.http.post('http://matchmakerz.in/api/v1/client/showInterest' , NewProfile ,{ 
           headers : new HttpHeaders({
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          console.log(response);
           }),err =>{
          console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        }
  }

}
