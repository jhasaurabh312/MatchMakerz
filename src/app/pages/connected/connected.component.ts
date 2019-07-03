import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ConnectedComponent implements OnInit {

 public connect : any = [];
  constructor(private http : HttpClient, public router : Router,config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  } 
 matchmaker:any;
  ngOnInit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })

     this.http.get('http://matchmakerz.in/api/v1/client/connected-interest?id='+ localStorage.getItem('clientId') , {headers : headers}).subscribe((response) =>{
          this.connect = response;
          console.log(this.connect);

          for(let i=0; i<this.connect.length;i++){
            if(this.connect[i].matched_to.profile_photo=== null)
          {
              if (this.connect[i].matched_to.gender===0){
                  this.connect[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';

              }
              else{
                  this.connect[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                
              }

          }
            if(this.connect[i].matched_to.marital_status == '0')
            this.connect[i].matched_to.marital = "Not Married";
            else
            this.connect[i].matched_to.marital = "Married";
  
  
            if(this.connect[i].matched_to.manglik == 0)
              this.connect[i].matched_to.manglik = 'Non-Manglik';
            else
              this.connect[i].matched_to.manglik = 'Manglik'; 
  
          
            this.connect[i].matched_to.inches = this.connect[i].matched_to.height % 12 ;
            this.connect[i].matched_to.feet = (this.connect[i].matched_to.height -  this.connect[i].matched_to.inches)/12;
          }

     })
  
  }

 
  awaited(){
    this.router.navigate(['/awaited']);
  }


  connected(){
    this.router.navigate(['/connected']);
  }

  view_phone(client_id){
        const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })
        console.log(client_id)
    this.http.get('http://matchmakerz.in/api/v1/client/matchmaker-contact?id='+ client_id , {headers : headers}).subscribe((response) =>{
    this.matchmaker = response;
    console.log(response)
    })

  }

  declined(){
    this.router.navigate(['/declined']);
    
  }

 open(content, client_id) {
   console.log(client_id)
    this.modalService.open(content);
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })
        console.log(client_id)
    this.http.get('http://matchmakerz.in/api/v1/client/matchmaker-contact?id='+ client_id , {headers : headers}).subscribe((response) =>{
    this.matchmaker = response;
    console.log(response)
    })

  }
  

}

