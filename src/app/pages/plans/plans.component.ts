import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans: any = [];
  result : any = [];
  constructor(private http : HttpClient) { }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

    this.http.get('http://matchmakerz.in/api/v1/matchmaker/review_credits',{headers : headers}).subscribe((result) => {
      this.result = result;
      console.log(this.result);
    })

    this.http.get('http://matchmakerz.in/api/v1/matchmaker/plans_for_existing',{headers : headers}).subscribe((res : any) => {
      console.log(res);
      this.plans = res["data"];
    })
  }

}
