import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  public staticProductDetail : any = [];
  response : any ;


  constructor(private http : HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

    return this.http.get('http://matchmakerz.in/api/v1/client/findMatches?id='+localStorage.getItem('clientId')+'&last_id=9999999', {headers : headers}).subscribe((response) =>{
     this.staticProductDetail = response;
     console.log(this.staticProductDetail);
     localStorage.setItem('lastMatchingClientId', this.staticProductDetail[19].id);
   })

  
  }

  getMore(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    return this.http.get('http://matchmakerz.in/api/v1/client/findMatches?id='+localStorage.getItem('clientId')+'&last_id='+localStorage.getItem('lastMatchingClientId'), {headers : headers}).subscribe((response) =>{
      this.staticProductDetail = response;
      console.log(this.staticProductDetail);
      localStorage.setItem('lastMatchingClientId', this.staticProductDetail[19].id);
      window.location.replace("/clients");
    })
 
   
    
  }

filter(){
  
}


}
