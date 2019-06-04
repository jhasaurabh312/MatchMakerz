import { Component, OnInit } from '@angular/core';
// import { staticProductDetail} from './clients.model';
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
   })

  }


  imageStyle(img) {
    return {
      'height': '40vh',
      'width' : '50%',
      'float' : 'left',
      'background-image':  `url('../../../assets/images/${img}')`
    };
  }
}
