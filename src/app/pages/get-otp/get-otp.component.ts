import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.scss']
})
export class GetOTPComponent implements OnInit {


  phone_number : string = "" ;
  response : any;

  constructor( private http : HttpClient) { } 

  ngOnInit() {
   
  }

  getOTP(data){   
    event.preventDefault();
    this.http.get('http://matchmakerz.in/api/v1/matchmaker/loginotp?phone_number='+ data.phone_number).subscribe((response) => {
      this.response = response;
      console.log(this.response);

      window.location.replace('/login');
    })
  }

  // 3c14963d6ec1568f62d753e92252d813b2e9cb9a
}
