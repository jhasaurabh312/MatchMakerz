import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public staticProductDetail : any = [];
  response : any ;

  
  
  constructor( private http : HttpClient) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

    return this.http.get('http://matchmakerz.in/api/v1/client/list?id=999999999', {headers : headers}).subscribe((response) =>{
     this.staticProductDetail = response;
     console.log(this.staticProductDetail);
     console.log(this.staticProductDetail.length);

     if(this.staticProductDetail.length===0)
      window.location.replace('/dummy');
    //  localStorage.setItem('lastClientId', this.staticProductDetail[19].id)
   })

  

  }

  getActivity(data){
    localStorage.setItem('clientId' , data);  
    window.location.replace('/awaited');
  }

  getMatches(data){
    localStorage.setItem('clientId' , data);
    window.location.replace('/filter');
  }

  clientProfile(data){
    // console.log(data);
    localStorage.setItem('clientId' , data);
    window.location.replace("/client-profile");
  }

  getMore(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    return this.http.get('http://matchmakerz.in/api/v1/client/list?id='+localStorage.getItem('lastClientId'), {headers : headers}).subscribe((response) =>{
      this.staticProductDetail = response;
      console.log(this.staticProductDetail);

      localStorage.setItem('lastClientId', this.staticProductDetail[19].id);
      window.location.replace("/clients");
    })
 
   
    
  }

}
