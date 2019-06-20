import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-awaited',
  templateUrl: './awaited.component.html',
  styleUrls: ['./awaited.component.scss']
})
export class AwaitedComponent implements OnInit {
  public show1 : Boolean = true;
  public show2 : Boolean = false;
  public awaitedIn : any = [];
  staticProductDetail : any = [];
  incoming : boolean;
  outgoing:  boolean;
  constructor(private http : HttpClient, public router : Router) { }

  ngOnInit() {

    this.incoming = true;
    this.outgoing = false;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/incoming-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
       this.awaitedIn = response;
       console.log('INcoming',this.awaitedIn)

       for(let i=0;i<this.awaitedIn.length;i++){
        if(this.awaitedIn[i].matched_to.profile_photo== null)
        this.awaitedIn[i].matched_to.profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';

        if(this.awaitedIn[i].matched_to.marital_status == '0')
         this.awaitedIn[i].matched_to.marital = "Not Married";
        else
         this.awaitedIn[i].matched_to.marital = "Married";


         if(this.awaitedIn[i].matched_to.manglik == 0)
          this.awaitedIn[i].matched_to.manglik = 'Non-Manglik';
         else
          this.awaitedIn[i].matched_to.manglik = 'Manglik'; 

       
         this.awaitedIn[i].matched_to.inches = this.awaitedIn[i].matched_to.height % 12 ;
         this.awaitedIn[i].matched_to.feet = (this.awaitedIn[i].matched_to.height -  this.awaitedIn[i].matched_to.inches)/12;
        
      } 
     })

     this.http.get('http://matchmakerz.in/api/v1/client/awaited-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
      this.staticProductDetail = response;
      console.log('outgoing',this.staticProductDetail)

      for(let i=0;i<this.staticProductDetail.length;i++){
        if(this.staticProductDetail[i].matched_to.profile_photo== null)
        this.staticProductDetail[i].matched_to.profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';

        if(this.staticProductDetail[i].matched_to.marital_status == '0')
         this.staticProductDetail[i].matched_to.marital = "Not Married";
        else
         this.staticProductDetail[i].matched_to.marital = "Married";


         if(this.staticProductDetail[i].matched_to.manglik == 0)
          this.staticProductDetail[i].matched_to.manglik = 'Non-Manglik';
         else
          this.staticProductDetail[i].matched_to.manglik = 'Manglik'; 

       
         this.staticProductDetail[i].matched_to.inches = this.staticProductDetail[i].matched_to.height % 12 ;
         this.staticProductDetail[i].matched_to.feet = (this.staticProductDetail[i].matched_to.height -  this.staticProductDetail[i].matched_to.inches)/12;
        
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
