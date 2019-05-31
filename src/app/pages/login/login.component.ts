import { Component, OnInit } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http'
import { LoginModule, LoginReturn } from '../../shared/models/login/login.module';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 constructor( private auth : LoginService , private http : HttpClient) { } 

 ngOnInit() {
   
  }

//  login(data){
  
//    let credentials : LoginModule = {
//      "phone_number" : data.phone_number,
//      "otp" : data.otp
//    }  

//    console.log(credentials);
   
//     if(data.otp != null && data.phone_number != null){
//       const options = {headers: {'Content-Type': 'application/json'}};
//       return this.http.post('http://matchmakerz.in/api/v1/matchmaker/login', credentials, options).pipe(catchError(error =>{
//         return throwError("Something went wrong");
//       })
//     ).subscribe( data => {
//       console.log(data);
//     });
//   }    
//     else{
//         alert('Something went wrong');
//        } 
  
//   }

  login(data){
  
    let phone_number = data.phone_number; 
    let otp = data.otp;
    // console.log(phone_number,otp);
   
    this.auth.getUsersDetail(data).subscribe( data => {
      console.log(data);
    });


  }

  
}
