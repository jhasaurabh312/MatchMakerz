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

  constructor(private http: HttpClient) { }

  ngOnInit() {
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

}
