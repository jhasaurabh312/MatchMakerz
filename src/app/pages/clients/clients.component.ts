import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  load_more = false;
  public staticProductDetail : any = [];
  public staticLoadProductDetail : any = [];
  response : any = [];
  load_response : any = [] ;
  a : BigInteger;
  show : boolean;
  clients: boolean=true;
  my_profile: boolean = false;
  notices : any =[];
  check : boolean ;
  check1 : boolean ;
  
  
  constructor( private http : HttpClient , public router : Router) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

     this.http.get('http://matchmakerz.in/api/v1/client/list?id=999999999', {headers : headers}).subscribe((response) =>{
     this.staticProductDetail = response;
     console.log(this.staticProductDetail);
  

     if(this.staticProductDetail.length===0){
      this.check = false ;
      this.check1 = true ;
     }
      
     else {
      this.check = true ; 
      this.check1 = false ; 
     }
     

     
      let l = this.staticProductDetail.length;
      if(l<20)
       this.show = false;
      else
       this.show = true; 
       
      // console.log(l, this.show); 

      for(let i=0;i<l;i++){
        if(this.staticProductDetail[i].profile_photo== null)
        this.staticProductDetail[i].profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';

        if(this.staticProductDetail[i].marital_status == '0')
         this.staticProductDetail[i].marital = "Not Married";
        else
         this.staticProductDetail[i].marital = "Married";


         if(this.staticProductDetail[i].manglik == 0)
          this.staticProductDetail[i].manglik = 'Non-Manglik';
         else
          this.staticProductDetail[i].manglik = 'Manglik'; 

       
         this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
         this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
        
      } 

      localStorage.setItem('lastClientId', this.staticProductDetail[l-1].id);
  
   })

   this.http.get('http://matchmakerz.in/api/v1/client/notifications' ,{ headers: headers }).subscribe((response:any)=>{
    this.notices=response.notification;
    console.log(this.notices);
  })

  }

  getActivity(data){
    localStorage.setItem('clientId' , data);  
    this.router.navigate(['/awaited']);
  }

  getMatches(data){
    localStorage.setItem('clientId' , data);
    this.router.navigate(['/matches']);
  }

  getProfile(data){
    localStorage.setItem('clientId' , data);
    this.router.navigate(['/client-profile']);
  }

  AddClient(){
    this.router.navigate(['/personal-details']);
  }

  plans(){
    this.router.navigate(['/plans']);
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

  GetMore(){
    // console.log("** get more **")
    // console.log(this.staticProductDetail.length)
    this.load_more = true;
    this.show = false;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })
    return this.http.get('http://matchmakerz.in/api/v1/client/list?id='+localStorage.getItem('lastClientId'), {headers : headers}).subscribe((load_response) =>{
      console.log((load_response))
      console.log(typeof(this.staticProductDetail))
      this.staticLoadProductDetail = load_response;
      this.staticProductDetail = [...this.staticProductDetail];
      this.staticProductDetail = [...this.staticProductDetail,...this.staticLoadProductDetail];
      console.log(this.staticProductDetail);

     
      let l = this.staticProductDetail.length;
      if(l<20)
       this.show = false;
      else
       this.show = true; 
       
      console.log(l, this.show); 

      for(let i=0;i<l;i++){
        if(this.staticProductDetail[i].profile_photo== null)
        this.staticProductDetail[i].profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';

        if(this.staticProductDetail[i].marital_status == '0')
         this.staticProductDetail[i].marital = "Not Married";
        else
         this.staticProductDetail[i].marital = "Married";


         if(this.staticProductDetail[i].manglik == 0)
          this.staticProductDetail[i].manglik = 'Non-Manglik';
         else
          this.staticProductDetail[i].manglik = 'Manglik'; 

       
         this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
         this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
        
      } 
      this.load_more = false;

      localStorage.setItem('lastClientId', this.staticProductDetail[l-1].id);
      this.router.navigate(['/clients']);
   })
   
    
  }


 myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

 signout(){
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Token ' + localStorage.getItem('token')
    // })
    // return this.http.get('http://matchmakerz.in/api/v1/matchmaker/logout', { headers: headers }).subscribe((response) => {
    //   this.response = response;
    //   if(this.response.status === 1){
    //     localStorage.setItem('is_active','false');
    //     window.location.replace('/');   
    //   }   
    //   else 
    //    console.log('Something went wrong'); 
    // })  

    localStorage.clear();
    this.router.navigate(['/get-otp']);
  }


}
