import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-awaited',
  templateUrl: './awaited.component.html',
  styleUrls: ['./awaited.component.scss']
})
export class AwaitedComponent implements OnInit {
  public show1 : Boolean = true;
  public show2 : Boolean = false;
  public awaitedIn : any = [];
  public awaitedOut : any = [];
  constructor(private http : HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/incoming-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.awaitedIn = response;
       console.log(this.awaitedIn)
     })

     this.http.get('http://matchmakerz.in/api/v1/client/awaited-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
      this.awaitedOut = response;
      console.log(this.awaitedOut)
     
    })
  
  }

  toggle1() {
   return this.show1 != this.show1;
  }

  toggle2() {
    return this.show2 != this.show2;
   }
   
  awaited(){
    window.location.replace('/awaited');
  }


  connected(){
    window.location.replace('/connected');
  }


  declined(){
    window.location.replace('/declined');
  }



}
