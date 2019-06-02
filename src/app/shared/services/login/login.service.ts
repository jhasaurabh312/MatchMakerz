import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { LoginModule, LoginReturn } from '../../models/login/login.module';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private http: HttpClient) { }

login(data){
  return this.http.post('http://matchmakerz.in/api/v1/matchmaker/login', data);
}

register(data){
  return this.http.post('http://matchmakerz.in/api/v1/matchmaker/register', data);
}

}

