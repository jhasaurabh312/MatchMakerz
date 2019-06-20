import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public staticProductDetail : any = [];
  response : any ;
  a : BigInteger;
  show : boolean;

  
  
  constructor( private http : HttpClient , public router : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

    return this.http.get('http://matchmakerz.in/api/v1/client/list?id=999999999', {headers : headers}).subscribe((response) =>{
     this.staticProductDetail = response;
     console.log(this.staticProductDetail);
    //  console.log(this.staticProductDetail.length);

     if(this.staticProductDetail.length===0)
      this.router.navigate(['/dummy']);

     
      let l = this.staticProductDetail.length;
      if(l<20)
       this.show = false;
      else
       this.show = true; 
       
      console.log(l, this.show); 

      for(let i=0;i<l;i++){
        if(this.staticProductDetail[i].profile_photo== null)
        this.staticProductDetail[i].profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';

        if(this.staticProductDetail[i].marital_status == '0')
         this.staticProductDetail[i].marital = "Not Married";
        else
         this.staticProductDetail[i].marital = "Married";


         if(this.staticProductDetail[i].manglik == 0)
          this.staticProductDetail[i].manglik = 'Non-Manglik';
         else
          this.staticProductDetail[i].manglik = 'Manglik'; 

       
         this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
         this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
        
      } 

      localStorage.setItem('lastClientId', this.staticProductDetail[l-1].id);
    //  localStorage.setItem('lastClientId', this.staticProductDetail[19].id)
   })

  

  }

  getActivity(data){
    localStorage.setItem('clientId' , data);  
    this.router.navigate(['/awaited']);
  }

  getMatches(data){
    localStorage.setItem('clientId' , data);
    this.router.navigate(['/filter']);
  }

  clientProfile(data){
    // console.log(data);
    localStorage.setItem('clientId' , data);
    this.router.navigate(['/client-profile']);
  }

  getMore(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    return this.http.get('http://matchmakerz.in/api/v1/client/list?id='+localStorage.getItem('lastClientId'), {headers : headers}).subscribe((response) =>{
      this.staticProductDetail = response;
      console.log(this.staticProductDetail);
      if(this.staticProductDetail.length===0)
      this.router.navigate(['/dummy']);

     
      let l = this.staticProductDetail.length;
      if(l<20)
       this.show = false;
      else
       this.show = true; 
       
      console.log(l, this.show); 

      for(let i=0;i<l;i++){
        if(this.staticProductDetail[i].profile_photo== null)
        this.staticProductDetail[i].profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';

        if(this.staticProductDetail[i].marital_status == '0')
         this.staticProductDetail[i].marital = "Not Married";
        else
         this.staticProductDetail[i].marital = "Married";


         if(this.staticProductDetail[i].manglik == 0)
          this.staticProductDetail[i].manglik = 'Non-Manglik';
         else
          this.staticProductDetail[i].manglik = 'Manglik'; 

       
         this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
         this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
        
      } 

      localStorage.setItem('lastClientId', this.staticProductDetail[l-1].id);
      this.router.navigate(['/clients']);
   })
   
    
  }

}
