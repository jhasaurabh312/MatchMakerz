import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.scss']
})
export class GetOTPComponent implements OnInit {


  phone_number : string = "" ;
  response : any;

  constructor( private http : HttpClient, private router:Router) { } 

  ngOnInit() {

     
   
  }

  getOTP(data){   
    event.preventDefault();
    localStorage.setItem('signup_phone_number',data.phone_number);
    this.http.get('http://matchmakerz.in/api/v1/matchmaker/loginotp?phone_number='+ data.phone_number).subscribe((response) => {
      this.response = response;
      console.log(this.response);

      // window.location.href=('/login');
      this.router.navigate(['/login']);
    })
  }

  // 3c14963d6ec1568f62d753e92252d813b2e9cb9a
}
