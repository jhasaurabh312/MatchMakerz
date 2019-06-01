import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  response : any;

  constructor( private http : HttpClient) { }

  ngOnInit() {
  }
 
  signout(event){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    return this.http.get('http://matchmakerz.in/api/v1/matchmaker/logout', { headers: headers }).subscribe((response) => {
      this.response = response;
      if(this.response.status === 1)
       window.location.replace('/');
       
      else 
       console.log('Something went wrong'); 

    })
    
  }
}
