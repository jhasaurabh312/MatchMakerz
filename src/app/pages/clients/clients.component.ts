import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import {
    FormBuilder,
    FormGroup
} from '@angular/forms';



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
  male : any;
  female :any;
  my_clients:any=[];
  SearchClient:any;
  constructor( private http : HttpClient , public router : Router,private route: ActivatedRoute,private _formBuilder: FormBuilder) {

        this.SearchClient = this._formBuilder.group({
          'search':[''],

        })

  }


// constructor(private modalService: NgbModal) {}
SerachMyClients(){
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 
      console.log(this.SearchClient.value["search"])
   this.http.get('http://matchmakerz.in/api/v1/matchmaker/searchclient?search='+this.SearchClient.value["search"], {headers : headers}).subscribe((response) =>{
       this.staticProductDetail = response;
     if(this.staticProductDetail.status===0)
         this.staticProductDetail = []

           let l = this.staticProductDetail.length;
           this.show = false;
     console.log(response)

           for(let i=0;i<l;i++){
        this.my_clients.push(this.staticProductDetail[i].id)
        // console.log(this.staticLoadProductDetail)
        if(this.staticProductDetail[i].profile_photo== null)
        {        
          if (this.staticProductDetail[i].gender === 1)
              this.staticProductDetail[i].profile_photo = this.female

           else{
             this.staticProductDetail[i].profile_photo=this.male 
           }

        }
        console.log(this.staticProductDetail[i].profile_photo)
   
         if(this.staticProductDetail[i].yearly_income>1000){
           this.staticProductDetail[i].yearly_income = this.staticProductDetail[i].yearly_income/100000
         }
  

        if(this.staticProductDetail[i].marital_status == '0')
         this.staticProductDetail[i].marital = "Not Married";
        else
         this.staticProductDetail[i].marital = "Married";


         if(this.staticProductDetail[i].manglik == 0)
          this.staticProductDetail[i].manglik = 'Non-Manglik';
         else if(this.staticProductDetail[i].manglik == 1)
          this.staticProductDetail[i].manglik = 'Manglik'; 
         else 
          this.staticProductDetail[i].manglik == 'Anshik Manglik' 

         if(this.staticProductDetail[i].occupation =='0')
          this.staticProductDetail[i].occupation = 'Not Working';
         else if(this.staticProductDetail[i].occupation =='1')
          this.staticProductDetail[i].occupation = 'Private Job';
         else if(this.staticProductDetail[i].occupation =='2')
          this.staticProductDetail[i].occupation = 'Self Employed';
         else if(this.staticProductDetail[i].occupation =='3')
          this.staticProductDetail[i].occupation = 'Government Job';
         else if(this.staticProductDetail[i].occupation =='4')
          this.staticProductDetail[i].occupation = 'Doctor';
         else 
           this.staticProductDetail[i].occupation = 'Teacher';  
          
          

       
         this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
         this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
        
      } 
   })
    
}

  ngOnInit() {

    this.male  = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png'
    // 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
    this.female= 'http://www.pranawellness.in/Images/female.png';
              
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 

     this.http.get('http://matchmakerz.in/api/v1/client/list?id=99999999999', {headers : headers}).subscribe((response) =>{
     this.staticProductDetail = response;
     console.log(this.staticProductDetail);
      let l = this.staticProductDetail.length;
      if(l<20)
       this.show = false;
      else
       this.show = true; 

     if(this.staticProductDetail.length===0){
      this.check = false ;
      this.check1 = true ;
      this.show = false;
     }
      
     else {
      this.check = true ; 
      this.check1 = false ; 
     }
     

     

       
      // console.log(l, this.show); 

      for(let i=0;i<l;i++){
        this.my_clients.push(this.staticProductDetail[i].id)
        // console.log(this.staticLoadProductDetail)
        if(this.staticProductDetail[i].profile_photo== null)
        {        
          if (this.staticProductDetail[i].gender === 1)
              this.staticProductDetail[i].profile_photo = this.female

           else{
             this.staticProductDetail[i].profile_photo=this.male 
           }

        }
        console.log(this.staticProductDetail[i].profile_photo)
   
         if(this.staticProductDetail[i].yearly_income>1000){
           this.staticProductDetail[i].yearly_income = this.staticProductDetail[i].yearly_income/100000
         }
  

        if(this.staticProductDetail[i].marital_status == '0')
         this.staticProductDetail[i].marital = "Not Married";
        else
         this.staticProductDetail[i].marital = "Married";


         if(this.staticProductDetail[i].manglik == 0)
          this.staticProductDetail[i].manglik = 'Non-Manglik';
         else if(this.staticProductDetail[i].manglik == 1)
          this.staticProductDetail[i].manglik = 'Manglik'; 
         else 
          this.staticProductDetail[i].manglik == 'Anshik Manglik' 

         if(this.staticProductDetail[i].occupation =='0')
          this.staticProductDetail[i].occupation = 'Not Working';
         else if(this.staticProductDetail[i].occupation =='1')
          this.staticProductDetail[i].occupation = 'Private Job';
         else if(this.staticProductDetail[i].occupation =='2')
          this.staticProductDetail[i].occupation = 'Self Employed';
         else if(this.staticProductDetail[i].occupation =='3')
          this.staticProductDetail[i].occupation = 'Government Job';
         else if(this.staticProductDetail[i].occupation =='4')
          this.staticProductDetail[i].occupation = 'Doctor';
         else 
           this.staticProductDetail[i].occupation = 'Teacher';  
          
          

       
         this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
         this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
        
      } 
            localStorage.setItem('my_clients', this.my_clients.toString());
       console.log(this.my_clients.length)


      localStorage.setItem('lastClientId', this.staticProductDetail[l-1].id);
  
   })

   this.http.get('http://matchmakerz.in/api/v1/client/notifications' ,{ headers: headers }).subscribe((response:any)=>{
    this.notices=response.notification;
    console.log(this.notices);
    this.notices.reverse()
  })

  }


  getActivity(data){
    localStorage.setItem('clientId' , data);  
    this.router.navigate(['/awaited'],{ queryParams: { id:data}});
  }

  NotView(data){

    localStorage.setItem('clientId' , data); 
    let id = 1;
    console.log(this.my_clients.includes(data.matched_for_id))
    if(this.my_clients.includes(data.matched_for_id))
      id = data.matched_for_id
    else
      id = data.matched_to_id
    console.log(data) 
    if(data.approved_by_receiver===0)
      this.router.navigate(['/declined'],{ queryParams: { id:id}});
    else if(data.approved_by_receiver===1)
      this.router.navigate(['/connected'],{ queryParams: { id:id}});
    else
      this.router.navigate(['/awaited'],{ queryParams: { id:id}});

  }


  getMatches(data, gender){
    localStorage.setItem('clientId' , data);
    localStorage.setItem('filter' , '0');
    localStorage.setItem('gender' , gender);

    localStorage.removeItem('min_age')
    localStorage.setItem('filter','0')


    localStorage.removeItem('max_age')
    localStorage.removeItem('min_income')

    localStorage.removeItem('max_income')

    localStorage.removeItem('min_height')

    localStorage.removeItem('max_height')

    localStorage.removeItem('marital_status')


    localStorage.removeItem('manglik')

    localStorage.removeItem('food_choice')


    localStorage.removeItem('occupation')
    localStorage.removeItem('citizenship')


    localStorage.removeItem('caste')
    localStorage.removeItem('prgender')
    this.router.navigate(['/matches'],{ queryParams: { id:data}});
  }

  getProfile(data){
    localStorage.setItem('clientId' , data);
    this.router.navigate(['/client-profile'],{ queryParams: { id:data}});
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

     
      let l = this.staticLoadProductDetail.length;
      console.log(l)
      if(l<20)
       this.show = false;
      else
       this.show = true; 
       if(this.staticLoadProductDetail.length===0){
         this.load_more=false;
          this.show = false;
        }
      // console.log(l, this.show); 

      for(let i=0;i<l;i++){
        this.my_clients.push(this.staticLoadProductDetail[i].id)
        if(this.staticProductDetail[i].profile_photo== null)
        this.staticProductDetail[i].profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';

        if(this.staticProductDetail[i].marital_status == '0')
         this.staticProductDetail[i].marital = "Not Married";
        else
         this.staticProductDetail[i].marital = "Married";


         if(this.staticProductDetail[i].manglik == 0)
          this.staticProductDetail[i].manglik = 'Non-Manglik';
         else if(this.staticProductDetail[i].manglik == 1)
          this.staticProductDetail[i].manglik = 'Manglik'; 
         else 
          this.staticProductDetail[i].manglik == 'Anshik Manglik' 

         if(this.staticProductDetail[i].occupation =='0')
          this.staticProductDetail[i].occupation = 'Not Working';
         else if(this.staticProductDetail[i].occupation =='1')
          this.staticProductDetail[i].occupation = 'Private Job';
         else if(this.staticProductDetail[i].occupation =='2')
          this.staticProductDetail[i].occupation = 'Self Employed';
         else if(this.staticProductDetail[i].occupation =='3')
          this.staticProductDetail[i].occupation = 'Government Job';
         else if(this.staticProductDetail[i].occupation =='4')
          this.staticProductDetail[i].occupation = 'Doctor';
         else 
           this.staticProductDetail[i].occupation = 'Teacher'; 
       
         this.staticProductDetail[i].inches = this.staticProductDetail[i].height % 12 ;
         this.staticProductDetail[i].feet = (this.staticProductDetail[i].height -  this.staticProductDetail[i].inches)/12;
        
      } 
         this.load_more=false;
       console.log(this.my_clients.length)
      localStorage.setItem('lastClientId', this.staticProductDetail[l-1].id);
      localStorage.setItem('my_clients', this.my_clients.toString());
      this.router.navigate(['/clients']);
   })
   
    
  }


 myFunction() {
  var x = document.getElementById("myDropdown");
  if(x.style.display==='block'){
    x.style.display='none';
  }
  else{
    x.style.display = 'block';
  }
} 
hide(){
  // $(".circle").click(function(){
  //   $("myDropdown").hide(500);
  // });
  var x = document.getElementById("myDropdown")
  x.style.display = "none";
}


}
