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

    return this.http.get('http://matchmakerz.in/api/v1/client/list?id=99999999', {headers : headers}).subscribe((response) =>{
     this.staticProductDetail = response;
     console.log(this.staticProductDetail);

    //  for(let i=0;i<20;i++){
    //    if(this.staticProductDetail[i].gender === 0){
    //      this.staticProductDetail[i].gender = 'Male';
    //      console.log(this.staticProductDetail[i].gender);
    //    }

    //    else{
    //     this.staticProductDetail[i].gender = 'Female';
    //     console.log(this.staticProductDetail[i].gender);
    //    }
       
    //  }

   })

  

  }

  getActivity(data){
    localStorage.setItem('clientId' , data);
    window.location.replace('/awaited');
  }

}
