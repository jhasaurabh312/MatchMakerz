import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-shortlisted',
  templateUrl: './shortlisted.component.html',
  styleUrls: ['./shortlisted.component.scss']
})
export class ShortlistedComponent implements OnInit {
  shortlistedTotal: any = [];
  shortlisted: any =[];
  res:any;
  

  constructor(private http : HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    this.http.get('http://matchmakerz.in/api/v1/client/total-shortlist?id='+localStorage.getItem('clientId'), {headers : headers}).subscribe((res) => {
      this.shortlistedTotal = res;
      console.log(this.shortlistedTotal);
   })


    this.http.get('http://matchmakerz.in/api/v1/client/shortList?id='+localStorage.getItem('clientId'), {headers : headers}).subscribe((res) => {
       this.shortlisted = res;
       console.log(this.shortlisted);

       let l = this.shortlisted.length;
       
 
       for(let i=0;i<l;i++){
         if(this.shortlisted[i].shortlist_to.profile_photo== null)
         this.shortlisted[i].shortlist_to.profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';
 
         if(this.shortlisted[i].shortlist_to.marital_status == '0')
          this.shortlisted[i].shortlist_to.marital = "Not Married";
         else
          this.shortlisted[i].shortlist_to.marital = "Married";
 
 
          if(this.shortlisted[i].shortlist_to.manglik == 0)
           this.shortlisted[i].shortlist_to.manglik = 'Non-Manglik';
          else
           this.shortlisted[i].shortlist_to.manglik = 'Manglik'; 
 
        
          this.shortlisted[i].shortlist_to.inches = this.shortlisted[i].shortlist_to.height % 12 ;
          this.shortlisted[i].shortlist_to.feet = (this.shortlisted[i].shortlist_to.height -  this.shortlisted[i].shortlist_to.inches)/12;
         
       } 
 
      
    })

   
  }

}
