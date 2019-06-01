import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupModel, LoginModule } from 'src/app/shared/models/login/login.module';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  response : any;

  productDetail: Array<{
    first_name: string;
    last_name : string;
    about: string;
    age: string;
    password : string;
    gender : string;
    whatsapp_number: string;
    referred_by : string;
    location: string;
    unique_about : string ;
    specialization : string;
    latitude : string;
    longitude : string;
    }> = SignupModel;

  constructor( private http : HttpClient) { }

  ngOnInit() {
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

  signout(){
    localStorage.clear();
    window.location.replace('/get-otp');
    window.history.go(-1);
  }

}
