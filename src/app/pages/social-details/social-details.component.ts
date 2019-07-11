import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import {SnackService} from '../../shared/services/snack.service'


@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.scss']
})
export class SocialDetailsComponent implements OnInit {


  AddClientEducationalDetails: FormGroup;
  error: any;
  data: any;
  castes: any;
  user : any = [];
  client_data: any = {
    'marital_status':'',
    'children':'',
    'mother_tongue':'',
    'religion':'',
    'zodiac':'',
    'manglik':'',
    'caste':'',
    'citizenship':'',
    'want_horoscope_match':''
  };

  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public router : Router, public snack : SnackService,private route: ActivatedRoute) { 
    this.AddClientEducationalDetails = this._formBuilder.group({
      'marital_status': [this.client_data.marital_status],
      'children': [this.client_data.children],
      'mother_tongue': [this.client_data.mother_tongue],
      'religion': [this.client_data.religion],
      'zodiac': [this.client_data.zodiac],
      'manglik': [this.client_data.manglik],
      'caste': [this.client_data.caste],
      'citizenship': [this.client_data.citizenship],
      'want_horoscope_match': [this.client_data.want_horoscope_match],
    });;
  }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    }) 


    this.http.get('http://matchmakerz.in/api/v1/client/castes',{headers : headers}).subscribe((res) => {
      console.log(res)
      this.castes = res
 
    })
   if(localStorage.getItem('clientId')){


    this.http.get('http://matchmakerz.in/api/v1/client/profile?id='+this.route.snapshot.queryParamMap.get('id'),{headers : headers}).subscribe((user) => {
      this.user = user;
      console.log(this.user);
         // localStorage.setItem('newClientId',localStorage.getItem('clientId'));
      // localStorage.removeItem('clientId')
this.client_data = user;
      localStorage.setItem('edit_client_marital_status',this.user.marital_status);
      localStorage.setItem('edit_client_mother_tongue',this.user.mother_tongue_id);
      localStorage.setItem('edit_client_children',this.user.children);
      localStorage.setItem('edit_client_religion',this.user.religion);
      localStorage.setItem('edit_client_zodiac',this.user.zodiac);
      localStorage.setItem('edit_client_manglik',this.user.manglik);
      localStorage.setItem('edit_client_caste',this.user.caste_id);
      localStorage.setItem('edit_client_citizenship',this.user.citizenship);
      localStorage.setItem('edit_client_want_horoscope_match',this.user.want_horoscope_match);
    this.AddClientEducationalDetails = this._formBuilder.group({

      'marital_status': [this.client_data.marital_status],
      'children': [this.client_data.children],
      'mother_tongue': [ this.client_data.mother_tongue_id !==null ?(this.client_data.mother_tongue_id).toString() : ''],
      'religion': [this.client_data.religion],
      'zodiac': [this.client_data.zodiac!=null ? (this.client_data.zodiac).toString() : ''],
      'manglik': [this.client_data.manglik!==null?(this.client_data.manglik).toString():''],
      'caste': [this.client_data.caste_id],
      'citizenship': [this.client_data.citizenship !=null ? (this.client_data.citizenship).toString() : ''],
      'want_horoscope_match': [(this.client_data.want_horoscope_match) ? '1':'0'],
    });;
      // localStorage.setItem('edit_client_birth_place',this.user.birth_place);
      // localStorage.setItem('edit_client_food_choice',this.user.food_choice);
      // localStorage.setItem('edit_client_disability',this.user.disability);
      // localStorage.setItem('edit_client_disabled_part',this.user.disabled_part);
    })
  }

  }



  addClient() {

    const NewProfile = new FormData();
    NewProfile.append('id', this.route.snapshot.queryParamMap.get('id'));   
    NewProfile.append('marital_status', this.AddClientEducationalDetails.value.marital_status);
    NewProfile.append('children', this.AddClientEducationalDetails.value.children);
    NewProfile.append('mother_tongue', this.AddClientEducationalDetails.value.mother_tongue);
    NewProfile.append('religion', this.AddClientEducationalDetails.value.religion);
    NewProfile.append('zodiac', this.AddClientEducationalDetails.value.zodiac);
    NewProfile.append('manglik', this.AddClientEducationalDetails.value.manglik);
    NewProfile.append('caste', this.AddClientEducationalDetails.value.caste);
    NewProfile.append('citizenship', this.AddClientEducationalDetails.value.citizenship);
    NewProfile.append('want_horoscope_match', this.AddClientEducationalDetails.value.want_horoscope_match);

    console.log(NewProfile);

    return this.http.post('http://matchmakerz.in/api/v1/client/client-social-update', NewProfile, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token'),
      })
    }).pipe(catchError((error) => {
      return throwError("oops");
    })).subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
      if (this.data.status === 1){
                                  this.snack.openSnackBar(this.data.message, 'success')

        this.router.navigate(['/client-family'],{ queryParams: { id:this.route.snapshot.queryParamMap.get('id')}});
      }
      else{
           this.snack.openSnackBar("Some Error Occure", 'required filed')
         }

    }), err => {
      console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
    }

  }

}
