import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { EditProfileService } from 'src/app/shared/services/editProfile/edit-profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  EditProfileDetails: FormGroup;
  error : any;
  val :any;
  data : any;
  values : string = '';
  suc :any;
  apiKey:string='AIzaSyCoWnTuLuqqx-SLvnv4gH6UHcC_Sr9KysU';

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, private edit : EditProfileService, private router: Router) { 
    this. EditProfileDetails= this._formBuilder.group({
      'first_name' : [''],
      'last_name' : [''],
      'age' : [''],
      'gender' : [''],
      'whatsapp_number' : [''],
      'about' : [''],
      'phone_number' : [''],
      'email' : [''],
      'unique_about' : [''],
      'specialization' : [''],
      'experience' : [''],
      // 'location' : [''],
    });; 
  }

  ngOnInit() {
   
  }

  editProfile(){

    const NewProfile  = new FormData();
   
    NewProfile.append('first_name', this.EditProfileDetails.value.first_name );
    NewProfile.append('last_name', this.EditProfileDetails.value.last_name );
    NewProfile.append('phone_number', this.EditProfileDetails.value.phone_number );
    NewProfile.append('email', this.EditProfileDetails.value.email );
    NewProfile.append('about', this.EditProfileDetails.value.about );
    NewProfile.append('unique_about', this.EditProfileDetails.value.unique_about );
    NewProfile.append('specialization', this.EditProfileDetails.value.specialization );
    NewProfile.append('gender', this.EditProfileDetails.value.gender);
    NewProfile.append('age', this.EditProfileDetails.value.age );
    NewProfile.append('experience', this.EditProfileDetails.value.experience );
    NewProfile.append('whatsapp_number', this.EditProfileDetails.value.whatsapp_number );

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/matchmaker/profile/' , NewProfile ,{ 
        headers : new HttpHeaders({
          // 'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('token'),
        })}).pipe(catchError((error) => {
          return throwError("oops"); })).subscribe((response:any) => {
          this.data = response;
          if(this.data.status === 1)
           this.router.navigate(['/my-profile']);
          else 
           alert('Cannot Update !! something went Wrong');  

        }),err =>{
          alert('Something went wrong please try again after Sometime');
        }
        
  }

  // getlocation(){

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'Application/json',
      
  //   })

  //   this.values = this.EditProfileDetails.value.location ;
  //   console.log(this.values);
  //   return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+this.values+'&key='+this.apiKey , {headers:headers}).subscribe((suc) => {
  //     this.suc=suc;
  //     console.log(this.suc);
  //   })
  // }

}



