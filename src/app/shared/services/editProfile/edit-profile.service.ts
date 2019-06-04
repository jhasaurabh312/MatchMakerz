import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginReturn } from '../../models/login/login.module';
import { EditProfileModule } from '../../models/EditProfile/edit-profile.module';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor( private http : HttpClient) { }
   
  // editProfile(data){
  //   return 
  // }
}
