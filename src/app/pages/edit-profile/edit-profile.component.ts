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
  notices :any;
  results : any = [];
  

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, private edit : EditProfileService, private router: Router) { 
    this. EditProfileDetails= this._formBuilder.group({
      'first_name' : [localStorage.getItem('signup_first_name')],
      'last_name' : [localStorage.getItem('signup_last_name')],
      'age' : [localStorage.getItem('signup_age')],
      'gender' : [localStorage.getItem('signup_gender')],
      'whatsapp_number' : [localStorage.getItem('signup_whatsapp_number')],
      'about' : [localStorage.getItem('signup_about')],
      'phone_number' : [localStorage.getItem('signup_phone_number')],
      'email' : [localStorage.getItem('signup_email')],
      'unique_about' : [localStorage.getItem('signup_unique_about')],
      'specialization' : [localStorage.getItem('signup_specialization')],
      'experience' : [localStorage.getItem('signup_experience')],
    });; 
  }

  ngOnInit() {
        const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 
       this.http.get('http://matchmakerz.in/api/v1/client/notifications' ,{ headers: headers }).subscribe((response:any)=>{
        this.notices=response.notification;
        console.log(this.notices);
      })
 
      this.http.get('http://matchmakerz.in/api/v1/matchmaker/profile/',{headers : headers}).subscribe((results : any) => {
         this.results = results;
         console.log(this.results);
         localStorage.setItem('signup_first_name' , this.results.first_name);
          localStorage.setItem('signup_last_name' , this.results.last_name);
          localStorage.setItem( 'signup_age', this.results.age);
          localStorage.setItem('signup_gender', this.results.gender);
          localStorage.setItem('signup_email', this.results.email);
          localStorage.setItem('signup_whatsapp_number', this.results.whatsapp_number);
          localStorage.setItem('signup_about', this.results.about);
          localStorage.setItem('signup_phone_number',this.results.phone_number);
          localStorage.setItem('signup_unique_about',this.results.unique_about);
          localStorage.setItem('signup_specialization',this.results.specialization);
          localStorage.setItem('signup_experience' , this.results.experience);

      })

   
  }



 myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
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

    console.log(this.EditProfileDetails.value);

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

  

}



