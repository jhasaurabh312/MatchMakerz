import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss']
})
export class ConnectedComponent implements OnInit {

 public connect : any = [];
  constructor(private http : HttpClient, public router : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/connected-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.connect = response;
       console.log(this.connect);
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

