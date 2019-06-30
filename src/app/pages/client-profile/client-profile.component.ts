import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  User : any = [];
  user : any = [];
  personal: boolean;
  social: boolean;
  preferences: boolean;
  selectedFile: File;
  response: any;

  constructor(private http: HttpClient, public router : Router) { }

  ngOnInit() {
    this.personal = true;
    this.social = false;
    this.preferences = false;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

     this.http.get('http://matchmakerz.in/api/v1/client/profile?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res : any) => {
      this.user = res;
      console.log(this.user);
      if(this.user.is_active == "true")
         this.user.is_active = 1;
      else
         this.user.is_active = 0;
    })

     this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res : any) => {
      this.User = res;
      console.log(this.User);
    })
  }

 ShowData(e){
     if(e === 'personal'){
       this.personal = true;
       this.social = false;
       this.preferences = false;
     }
     else if (e=='social'){
       this.personal = false;
       this.social = true;
       this.preferences = false;
     }
     else{
       this.personal = false;
       this.social = false;
       this.preferences = true;
     }
   }


processfile(event){
  // const image = event.target.files[0] ;
  this.selectedFile =  (event.target.files[0])
   const uploadData = new FormData();
   console.log(this.selectedFile)
   this.user.profile_pic = URL.createObjectURL(this.selectedFile);
    uploadData.append('profile_pic', this.selectedFile,  this.selectedFile.name);
    console.log(this.user.profile_pic)
    uploadData.append('matchmaker_id', this.user.id);

    this.http.post('http://matchmakerz.in/api/v1/matchmaker/uploadProfilePic' , uploadData ,{ 
    headers : new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token'),
    })}).pipe(catchError((error) => {
      return throwError("oops"); }))
      .subscribe((response:any) => {
      this.response = response;
      console.log(this.response);
      if(this.response.status === 1)
       this.router.navigate(['/my-profile']);
      else 
       alert('Cannot Update !! something went Wrong');  

    }),err =>{
      alert('Something went wrong please try again after Sometime');
    }
}

 delete(){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token')
  }) 

   this.http.get('http://matchmakerz.in/api/v1/client/deleteClient?id='+localStorage.getItem('clientId')+'&is_active='+this.user.is_active,{headers : headers}).subscribe((res : any) => {
    this.user = res;
    console.log(this.user);
  })

 }



}
