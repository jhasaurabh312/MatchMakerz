import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http'
import { LoginModule, LoginReturn } from '../../models/login/login.module';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http : HttpClient) { }

  getUsersDetail(data){

    const credentials : LoginModule = {
           phone_number : data.phone_number,
           otp : data.otp,
         };
    return this.http.post('http://matchmakerz.in/api/v1/matchmaker/login', credentials, {
              headers : new HttpHeaders({
                'Content-Type' : 'application/json' ,                
              })
            }).pipe(catchError(error =>{
        return throwError("Something went wrong");
      })
    )
  }

}
