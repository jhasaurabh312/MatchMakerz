import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyprofileService } from '../../shared/services/myProfile/myprofile.service'

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public user : any = [];
  public response : any;
  public show:boolean = false;

  constructor( private http : HttpClient , private myProfile : MyprofileService) { }

  ngOnInit() {
    this.myProfile.view_profile().subscribe((response) => {
          this.user = response; 
          console.log(this.user) ;  
          if(this.user.profile_pic === null)
           this.user.profile_pic ='https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png' ;  
    })  
    
  }

  toggle() {
    this.show = !this.show;
  }
 
  signout(){
    localStorage.clear();
    window.history.go(-1);
    window.location.replace('/');
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

