import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss']
})
export class ConnectedComponent implements OnInit {

 public connected : any = [];
  constructor(private http : HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/connected-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.connected = response;
       console.log(this.connected);
      //  console.log(localStorage.getItem('clientId'));
     })
  
  }
}

