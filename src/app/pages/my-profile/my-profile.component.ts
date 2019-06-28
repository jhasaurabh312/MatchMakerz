import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyprofileService } from '../../shared/services/myProfile/myprofile.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public user : any = [];
  public response : any;
  public show:boolean = false;
  clients: boolean= !true;
  my_profile: boolean = !false;
  constructor( private http : HttpClient , private myProfile : MyprofileService, public router : Router) { }

  ngOnInit() {
    this.myProfile.view_profile().subscribe((response) => {
          this.user = response; 
          console.log(this.user) ;  
          if(this.user.profile_pic === null)
           this.user.profile_pic ='https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png' ;  
    })  
    
  }
  ActiveBorder(e){
    if(e==='my_profile'){
      this.my_profile  =true;
      this.clients = false
    }
    else{
           this.my_profile  = !true;
      this.clients = !false 
    }
  }
  toggle() {
    this.show = !this.show;
  }
 
  signout(){
    localStorage.clear();
    window.history.go(-1);
    this.router.navigate(['/get-otp']);
  }

  editProfile(){
    this.router.navigate(['/edit-profile']);
  }
  
 myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
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

