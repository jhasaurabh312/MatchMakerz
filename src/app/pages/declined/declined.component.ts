import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-declined',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.scss']
})
export class DeclinedComponent implements OnInit {

  public show : Boolean = false;
  public awaitedIn : any = [];
  public awaitedOut : any = [];
  outgoing : boolean = true;
  incoming : boolean = false;
  constructor(private http : HttpClient, public router : Router) { }
  male:any;
  female:any;
  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })
                  this.male = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                  this.female= 'http://www.pranawellness.in/Images/female.png';


     this.http.get('http://matchmakerz.in/api/v1/client/declined-interest-incoming?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.awaitedIn = response;
       console.log(this.awaitedIn)

     })

     this.http.get('http://matchmakerz.in/api/v1/client/declined-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
      this.awaitedOut = response;
      console.log(this.awaitedOut)
    })
  
  }
  
  awaited(){
    this.router.navigate(['/awaited']);
  }

     ShowDeclined(e){
     if(e === 'incoming'){
               this.incoming = true;
       this.outgoing = false;
     }
     else{
        this.incoming = false;
       this.outgoing = true;

     }
   }


  connected(){
    this.router.navigate(['/connected']);
  }


  declined(){
    this.router.navigate(['/declined']);
  }

  accept(data){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     return this.http.get('http://matchmakerz.in/api/v1/client/statusaccept-interest?id='+data, {headers : headers}).subscribe((result:any) => {
       console.log(result);
     })
  }

  decline(data){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')

    })

     this.http.get('http://matchmakerz.in/api/v1/client/statusdecline-interest?id='+data, {headers : headers}).subscribe((result:any) => {
       console.log(result);
     })
      this.http.get('http://matchmakerz.in/api/v1/client/declined-interest-incoming?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.awaitedIn = response;
       console.log(this.awaitedIn)
     })

     this.http.get('http://matchmakerz.in/api/v1/client/declined-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
      this.awaitedOut = response;
      console.log(this.awaitedOut)
    })
  }

  
}

