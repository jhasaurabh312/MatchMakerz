import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public notices : any =[];

  constructor(private http:HttpClient) { }

  ngOnInit() {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

   this.http.get('http://matchmakerz.in/api/v1/client/notifications' ,{ headers: headers }).subscribe((response:any)=>{
     this.notices=response.notification;
     console.log(this.notices);
   })
  }

 myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
}
