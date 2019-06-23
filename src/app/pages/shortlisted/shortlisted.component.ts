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


    this.http.get('http://matchmakerz.in/api/v1/client/shortlist?id='+localStorage.getItem('clientId'), {headers : headers}).subscribe((res) => {
       this.shortlisted = res;
       console.log(this.shortlisted);
    })

  //   this.http.get('http://matchmakerz.in/api/v1/client/total-shortlist?id='+localStorage.getItem('clientId'), {headers : headers}).subscribe((res) => {
  //     this.shortlistedTotal = res;
  //     console.log(this.shortlistedTotal);
  //  })
  }

}
