import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  pref_caste:any='';
  see_more:boolean=false;

  constructor(private http: HttpClient, public router : Router, private modalService: NgbModal) { }

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
        if(this.user.profile_photo === null ){ 
                if (this.user.gender=== 0){
                    this.user.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                }
                else{
                    this.user.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                }
        } 
     
      
       if(this.user.marital === 0)
         this.user.marital = "Not Married";
        else if(this.user.marital === 1)
         this.user.marital = "Divorced";
        else 
        this.user.marital = "Widowed";


         if(this.user.manglik === 0)
          this.user.manglik = 'Non-Manglik';
         else if(this.user.manglik === 1)
          this.user.manglik = 'Manglik'; 
         else 
          this.user.manglik = 'Anshik Manglik' 

        if(this.user.religion ==='0')
          this.user.religion = 'Hindu';
         else if(this.user.religion ==='1')
          this.user.religion = 'Muslim';
         else if(this.user.religion ==='2')
          this.user.religion = 'Christian';
         else if(this.user.religion ==='3')
          this.user.religion = 'Sikh';
         else if(this.user.religion =='4')
          this.user.religion = 'Jain';
         else 
           this.user.religion = 'Other';   
 
         if(this.user.occupation ==='0')
          this.user.occupation = 'Not Working';
         else if(this.user.occupation ==='1')
          this.user.occupation = 'Private Job';
         else if(this.user.occupation ==='2')
          this.user.occupation = 'Self Employed';
         else if(this.user.occupation ==='3')
          this.user.occupation = 'Government Job';
         else if(this.user.occupation ==='4')
          this.user.occupation = 'Doctor';
         else if (this.user.occupation ==='5')
           this.user.occupation = 'Teacher'; 
         else
           this.user.occupation = '-'
         
         if(this.user.food_choice === 0)
            this.user.food_choice = 'Vegetarian';
         else
            this.user.food_choice = 'Non Vegetarian';   
       
         this.user.inches = this.user.height % 12 ;
         this.user.feet = (this.user.height -  this.user.inches)/12;


         if(this.user.occupation === 0)
          this.user.occupation = 'Not Working'; 
         else if(this.user.occupation == 1)
          this.user.occupation = 'Private Company';   
         else if(this.user.occupation === 2)
          this.user.occupation = 'Self Employed';   
         else if(this.user.occupation === 3)
          this.user.occupation = 'Government Job';   
         else if(this.user.occupation === 4)
          this.user.occupation = 'Doctor';  
         else if (this.user.occupation ==='5')
           this.user.occupation = 'Teacher'; 
         else
           this.user.occupation = '-'
          
         
         if(this.user.father_status === 0)
           this.user.father_status = 'Alive'; 
         else 
           this.user.father_status = 'Dead';  
          

         if(this.user.mother_status === 0)
           this.user.mother_status = 'Alive'; 
         else if(this.user.mother_status === 1)
           this.user.mother_status = 'Dead';  
         
         else if(this.user.mother_status === 1)
           this.user.mother_status = '-';  
         


          if(this.user.father_occupation === 0)
           this.user.father_occupation = 'Not Working'; 
          else if(this.user.father_occupation === 1)
           this.user.father_occupation = 'Private Company';   
          else if(this.user.father_occupation === 2)
           this.user.father_occupation = 'Self Employed';   
          else if(this.user.father_occupation === 3)
           this.user.father_occupation = 'Government Job';   
          else if(this.user.father_occupation === 4)
           this.user.father_occupation = 'Doctor';  
          else
           this.user.father_occupation = 'Teacher';   

           if(this.user.mother_occupation === 0)
           this.user.mother_occupation = 'Not Working'; 
          else if(this.user.mother_occupation === 1)
           this.user.mother_occupation = 'Private Company';   
          else if(this.user.mother_occupation === 2)
           this.user.mother_occupation = 'Self Employed';   
          else if(this.user.mother_occupation === 3)
           this.user.mother_occupation = 'Government Job';   
          else if(this.user.mother_occupation === 4)
           this.user.mother_occupation = 'Doctor';  
         else if (this.user.occupation ==='5')
           this.user.occupation = 'Teacher'; 
         else
           this.user.occupation = '-'
            
        

      if(this.user.is_active === "true")
         this.user.is_active = 1;
      else
         this.user.is_active = 0;

         console.log(this.user);
    })

     this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+localStorage.getItem('clientId'),{headers : headers}).subscribe((res : any) => {
      this.User = res;
      console.log(this.User.caste.length);
      console.log(this.pref_caste)
      if(this.User.caste.length>2){
        this.pref_caste = this.User.caste[0].caste+", "+this.User.caste[1].caste;
        this.see_more = true;
              console.log(this.pref_caste)

      }

      else{
        for(let i =0;i<this.User.caste.length;i++){
          this.pref_caste+=this.User.caste[i].caste+', ';
        }
              console.log(this.pref_caste)

      }
      if(this.User.marital === 0)
         this.User.marital = "Not Married";
        else if(this.User.marital === 1)
         this.User.marital = "Divorced";
        else 
        this.User.marital = "Widowed";


         if(this.User.manglik === 0)
          this.User.manglik = 'Non-Manglik';
         else if(this.User.manglik === 1)
          this.User.manglik = 'Manglik'; 
         else 
          this.User.manglik == 'Anshik Manglik' 

       

         if(this.User.occupation ==='0')
          this.User.occupation = 'Not Working';
         else if(this.User.occupation ==='1')
          this.User.occupation = 'Private Job';
         else if(this.User.occupation ==='2')
          this.User.occupation = 'Self Employed';
         else if(this.User.occupation ==='3')
          this.User.occupation = 'Government Job';
         else if(this.User.occupation ==='4')
          this.User.occupation = 'Doctor';
         else if (this.user.occupation ==='5')
           this.user.occupation = 'Teacher'; 
         else
           this.user.occupation = '-';

         
         if(this.User.food_choice === 0)
            this.User.food_choice = 'Vegetarian';
         else
            this.User.food_choice = 'Non Vegetarian';   
       
         this.User.min_inches = this.User.min_height % 30 ;
         this.User.min_feet = (this.User.min_height -  this.User.min_inches)/30;


         this.User.max_inches = this.User.max_height % 30 ;
        //  console.log(this.User.max_inches)
         this.User.max_feet = (this.User.max_height -  this.User.max_inches)/30;


        if(this.User.citizenship === 0)
          this.User.citizenship = 'Indian';
        else
          this.User.citizenship = 'NRI';

          if(this.User.min_age === null)
           this.User.min_age = 'na' ;
         else{
                    this.User.min_age = 2019-(this.User.min_age).split('-')[0]
         }
           if(this.User.max_age === null)
           this.User.max_age = 'na' ; 
         else{
                    this.User.max_age = 2019-(this.User.max_age).split('-')[0]
         }


    })
  }

 ShowData(e){
     if(e === 'personal'){
       this.personal = true;
       this.social = false;
       this.preferences = false;
       window.scrollTo(0,400)
     }
     else if (e=='social'){
       this.personal = false;
       this.social = true;
       this.preferences = false;
       window.scrollTo(0,1200)

     }
     else{
       this.personal = false;
       this.social = false;
       this.preferences = true;
       window.scrollTo(0,2140)

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

 editprofile(data1){
   localStorage.setItem('clientProfileId',data1);
      localStorage.setItem('clientId',data1);

   this.router.navigate(['/edit-personal']);
 }

 editeducation(data1){
   localStorage.setItem('clientProfileId',data1);
      localStorage.setItem('clientId',data1);

   this.router.navigate(['/educational-details']);
 }
 editsocial(data1){
   localStorage.setItem('clientProfileId',data1);
      localStorage.setItem('clientId',data1);

   this.router.navigate(['/social-details']);
 }
 editfamily(data1){
   localStorage.setItem('clientProfileId',data1);
      localStorage.setItem('clientId',data1);

   this.router.navigate(['/client-family']);
 }
 editpreferences(data1){
   localStorage.setItem('clientProfileId',data1);
   localStorage.setItem('clientId',data1);
   localStorage.setItem('newClientId',data1);
   this.router.navigate(['/client-preferences']);
 }
 open(content) {

    this.modalService.open(content);

  }
}
