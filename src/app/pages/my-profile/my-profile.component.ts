import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupModel, LoginModule } from 'src/app/shared/models/login/login.module';
import { MyprofileService } from '../../shared/services/myProfile/myprofile.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public user : any = [];
  public response : any;

  constructor( private http : HttpClient , private myProfile : MyprofileService) { }

  ngOnInit() {
    this.myProfile.view_profile().subscribe((response) => {
          this.user = response; 
          console.log(this.user) ;    
    })  
    
  }
 
  signout(){
    localStorage.clear();
    window.location.replace('/get-otp');
    window.history.go(-1);
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

