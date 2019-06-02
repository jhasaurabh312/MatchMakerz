import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginReturn } from '../../models/login/login.module';
import { EditProfileModule } from '../../models/EditProfile/edit-profile.module';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor( private http : HttpClient) { }

    editProfile(data : EditProfileModule) : Observable<LoginReturn>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token'),
    })

    return this.http.post<any>('http://matchmakerz.in/api/v1/matchmaker/profile' , data ,{ headers: headers })
  }
}
