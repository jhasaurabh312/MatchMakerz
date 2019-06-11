import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.scss']
})
export class SocialDetailsComponent implements OnInit {


  AddClientEducationalDetails: FormGroup;
  error: any;
  data: any;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    this.AddClientEducationalDetails = this._formBuilder.group({
      'marital_status': [''],
      'children': [''],
      'mother_tongue': [''],
      'religion': [''],
      'zodiac': [''],
      'manglik': [''],
      'caste': [''],
      'citizenship': [''],
      'want_horoscope_match': [''],
    });;
  }

  ngOnInit() {
  }



  addClient() {

    const NewProfile = new FormData();
    // NewProfile.append('id', localStorage.getItem('newClientId') );   
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

    return this.http.post('http://matchmakerz.in/api/v1/client/client-social-update?id=' + localStorage.getItem('newClientId'), NewProfile, {
      headers: new HttpHeaders({
        'Authorization': 'Token ' + localStorage.getItem('token'),
      })
    }).pipe(catchError((error) => {
      return throwError("oops");
    })).subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
      if (this.data.status === 1)
        window.location.replace('/client-family');

    }), err => {
      console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
    }

  }

}
