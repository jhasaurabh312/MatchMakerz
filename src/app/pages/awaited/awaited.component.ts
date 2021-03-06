import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  SnackService
} from '../../shared/services/snack.service'

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
  check : boolean ;
  check1 : boolean ;
  constructor(private http : HttpClient, public router : Router,public snack: SnackService,private route: ActivatedRoute) { }

  ngOnInit() { 

    this.incoming = false;
    this.outgoing = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/incoming-interest?id='+ this.route.snapshot.queryParamMap.get('id') , {headers : headers}).subscribe((response) =>{
       this.awaitedIn = response;
       console.log('Incoming',this.awaitedIn)

       if(this.awaitedIn.length===0){
        this.check = false ;
        this.check1 = true ;
       }
        
       else {
        this.check = true ; 
        this.check1 = false ; 
       }

       for(let i=0;i<this.awaitedIn.length;i++){
          if(this.awaitedIn[i].matched_to.profile_photo== null)
          {
              if (this.awaitedIn[i].matched_to.gender===0){
                  this.awaitedIn[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';

              }
              else{
                  this.awaitedIn[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                
              }

          }
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

     this.http.get('http://matchmakerz.in/api/v1/client/awaited-interest?id='+ this.route.snapshot.queryParamMap.get('id'), {headers : headers}).subscribe((response) =>{
      this.staticProductDetail = response;
      console.log('outgoing',this.staticProductDetail)

      if(this.staticProductDetail.length===0){
        this.check = false ;
        this.check1 = true ;
       }
        
       else {
        this.check = true ; 
        this.check1 = false ; 
       }

      for(let i=0;i<this.staticProductDetail.length;i++){
             if(this.staticProductDetail[i].matched_to.profile_photo== null)
          {
              if (this.staticProductDetail[i].matched_to.gender===0){
                  this.staticProductDetail[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';

              }
              else{
                  this.staticProductDetail[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                
              }

          }
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

   ShowAwaited(e){
     if(e === 'incoming'){
               this.incoming = true;
       this.outgoing = false;
     }
     else{
        this.incoming = false;
       this.outgoing = true;

     }
   }

  awaited(){
    this.router.navigate(['/awaited'],{ queryParams: { id:this.route.snapshot.queryParamMap.get('id')}});
  }


  connected(){
    this.router.navigate(['/connected'],{ queryParams: { id:this.route.snapshot.queryParamMap.get('id')}});
  }
  
  clientProfile(data){
    localStorage.setItem('clientId' , data);
    this.router.navigate(['/client-profile'],{ queryParams: { id:data}});
  }


  declined(){
    this.router.navigate(['/declined'],{ queryParams: { id:this.route.snapshot.queryParamMap.get('id')}});
  }

  accept(data){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    console.log(data)
     return this.http.get('http://matchmakerz.in/api/v1/client/statusaccept-interest?id='+data, {headers : headers}).subscribe((result:any) => {
       console.log(result);
          if (result.status === 1) {
              this.snack.openSnackBar(result.message, 'success')

            } else {
              this.snack.openSnackBar(result.message, 'error')

            }
     })

  }

  decline(data){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/statusdecline-interest?id='+data, {headers : headers}).subscribe((response:any) => {
       console.log(response);
             if (response.status === 1) {
          this.snack.openSnackBar(response.message, 'success')

        } else {
          this.snack.openSnackBar(response.message, 'error')

        }
     })
     return  this.http.get('http://matchmakerz.in/api/v1/client/awaited-interest?id='+ this.route.snapshot.queryParamMap.get('id') , {headers : headers}).subscribe((response) =>{
      this.staticProductDetail = response;
      console.log('outgoing',this.staticProductDetail)

      if(this.staticProductDetail.length===0){
        this.check = false ;
        this.check1 = true ;
       }
        
       else {
        this.check = true ; 
        this.check1 = false ; 
       }

      for(let i=0;i<this.staticProductDetail.length;i++){
             if(this.staticProductDetail[i].matched_to.profile_photo== null)
          {
              if (this.staticProductDetail[i].matched_to.gender===0){
                  this.staticProductDetail[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';

              }
              else{
                  this.staticProductDetail[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                
              }

          }
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

 
}
