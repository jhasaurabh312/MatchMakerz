import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  User : any = [];
  user : any = [];
  personal: boolean;
  social: boolean;
  preferences: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.personal = true;
    this.social = false;
    this.preferences = false;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

     this.http.get('http://matchmakerz.in/api/v1/client/profile?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res : any) => {
      this.user = res;
      console.log(this.user);
    })

     this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res : any) => {
      this.User = res;
      console.log(this.User);
    })
  }

 ShowData(e){
     if(e === 'personal'){
       this.personal = true;
       this.social = false;
       this.preferences = false;
     }
     else if (e=='social'){
       this.personal = false;
       this.social = true;
       this.preferences = false;
     }
     else{
       this.personal = false;
       this.social = false;
       this.preferences = true;
     }
   }


}
