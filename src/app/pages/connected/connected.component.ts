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

          for(let i=0; i<this.connect.length;i++){
            if(this.connect[i].matched_to.profile_photo== null)
            this.connect[i].matched_to.profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';
  
            if(this.connect[i].matched_to.marital_status == '0')
            this.connect[i].matched_to.marital = "Not Married";
            else
            this.connect[i].matched_to.marital = "Married";
  
  
            if(this.connect[i].matched_to.manglik == 0)
              this.connect[i].matched_to.manglik = 'Non-Manglik';
            else
              this.connect[i].matched_to.manglik = 'Manglik'; 
  
          
            this.connect[i].matched_to.inches = this.connect[i].matched_to.height % 12 ;
            this.connect[i].matched_to.feet = (this.connect[i].matched_to.height -  this.connect[i].matched_to.inches)/12;
          }

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

