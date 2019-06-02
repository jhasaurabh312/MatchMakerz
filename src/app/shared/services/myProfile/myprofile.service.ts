import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupModel } from '../models/login/login.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  constructor( private http : HttpClient) { }
 
  view_profile(){

    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        })

        return this.http.get('http://matchmakerz.in/api/v1/matchmaker/profile' ,{ headers: headers })
  }
 
  
}


  // signout(event){
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Token ' + localStorage.getItem('token')
  //   })
  //   return this.http.get('http://matchmakerz.in/api/v1/matchmaker/logout', { headers: headers }).subscribe((response) => {
  //     this.response = response;
  //     if(this.response.status === 1){
  //       localStorage.setItem('is_active','false');
  //       window.location.replace('/');   
  //     }   
  //     else 
  //      console.log('Something went wrong'); 
  //   })  
  // }

