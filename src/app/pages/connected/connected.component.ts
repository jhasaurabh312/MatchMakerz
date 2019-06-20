import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss']
})
export class ConnectedComponent implements OnInit {

 public connect : any = [];
  constructor(private http : HttpClient, public router : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/connected-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.connect = response;
       console.log(this.connect);
     })
  
  }

 
  awaited(){
    this.router.navigate(['/awaited']);
  }


  connected(){
    this.router.navigate(['/connected']);
  }


  declined(){
    this.router.navigate(['/declined']);
  }

  

}

