 import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyprofileService } from '../../shared/services/myProfile/myprofile.service'
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public user : any = [];
  result : any = [];
  public response : any;
  public show:boolean = false;
  clients: boolean= !true;
  my_profile: boolean = !false;
   selectedFile: File
  constructor( private http : HttpClient , private myProfile : MyprofileService, public router : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 
    
    this.http.get('http://matchmakerz.in/api/v1/matchmaker/totalclients', {headers : headers}).subscribe((result) => {
      this.result = result;
      console.log(this.result);
    })

    this.myProfile.view_profile().subscribe((response) => {
          this.user = response; 
          console.log(this.user) ; 
          localStorage.setItem('signup_first_name' , this.user.first_name);
          localStorage.setItem('signup_last_name' , this.user.last_name);
          localStorage.setItem('signup_age', this.user.age);
          localStorage.setItem('signup_gender', this.user.gender);
          localStorage.setItem('signup_email', this.user.email);
          localStorage.setItem('signup_whatsapp_number', this.user.whatsapp_number);
          localStorage.setItem('signup_about', this.user.about);
          localStorage.setItem('signup_phone_number',this.user.phone_number);
          localStorage.setItem('signup_unique_about',this.user.unique_about);
          localStorage.setItem('signup_specialization',this.user.specialization);

          if(this.user.experience!==null){
            console.log(this.user.experience)
            console.log("******")
            localStorage.setItem('signup_experience' , this.user.experience); 
          }
          else{
            this.user.experience = 0;
            console.log(this.user.experience)
            console.log("******")

            localStorage.setItem('signup_experience' , '0');
          }

            console.log(localStorage.getItem('signup_experience'))
          if(this.user.profile_pic === null)
             this.user.profile_pic ='https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png' ;  
    })  
    
  }
  ActiveBorder(e){
    if(e==='my_profile'){
      this.my_profile  =true;
      this.clients = false
    }
    else{
           this.my_profile  = !true;
      this.clients = !false 
    }
  }
  toggle() {
    this.show = !this.show;
  }
 
  signout(){
    localStorage.clear();
    this.router.navigate(['/carousel']);
  }

  editProfile(){
    this.router.navigate(['/edit-profile']);
  }
  
 myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

processfile(event){
  // const image = event.target.files[0] ;
  this.selectedFile =  (event.target.files[0])
   const uploadData = new FormData();
   console.log(this.selectedFile)
    uploadData.append('profile_pic', this.selectedFile,  this.selectedFile.name);
    // console.log(this.user.profile_pic)
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

submit(){
   const NewValue = new FormData();
   NewValue.append('profile_pic',(<HTMLInputElement>document.getElementById('photo')).value);

   this.http.post('http://matchmakerz.in/api/v1/matchmaker/uploadProfilePic' , NewValue ,{ 
    headers : new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token'),
    })}).pipe(catchError((error) => {
      return throwError("oops"); })).subscribe((response:any) => {
      this.response = response;
      console.log(this.response);
      if(this.response.status === 1)
       this.router.navigate(['/my-profile']);
      else 
       alert('Cannot Update !! something went Wrong');  

    }),err =>{
      alert('Something went wrong please try again after Sometime');
    }

  //  console.log((<HTMLInputElement>document.getElementById('photo')).value);

   

   
}

viewWebsite(id){
  console.log(id)
       this.router.navigate(['http://hansmatrimony.com/matchmaker/profile?matchmaker_id='+id]);
}

}


 
