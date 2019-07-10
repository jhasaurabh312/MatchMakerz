import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public filtered : any =[];
  EditClientPreferences: FormGroup;
  error : any;
  data : any; 
  page : number;
  a :string;
  selectedValue: any = '0';
  res : any = [];
  caste_arr :any = [];
  castes: any = []
  //  = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
  constructor(private _formBuilder: FormBuilder, private http : HttpClient, public route : Router,private routes: ActivatedRoute) { 
    // console.log(2019-parseInt(localStorage.getItem('min_age')))
    this.EditClientPreferences = this._formBuilder.group({
      'min_age' : [2019-parseInt(localStorage.getItem('min_age'))],
      'max_age' : [2019-parseInt(localStorage.getItem('max_age'))],
      'min_income' : [(parseFloat(localStorage.getItem('min_income')))],
      'max_income' : [(parseFloat(localStorage.getItem('max_income')))],
      'min_height' : [localStorage.getItem('min_height')],
      'max_height' : [localStorage.getItem('max_height')],
      'marital_status' : [localStorage.getItem('marital_status')],
      'manglik' : [localStorage.getItem('manglik')],
      'food_choice' : [localStorage.getItem('food_choice')],
      'occupation' : [localStorage.getItem('occupation')],
      'citizenship' : [localStorage.getItem('citizenship')],
      'caste' : [this.caste_arr],
      'gender' : [localStorage.getItem('prgender')],
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
       this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id='+ this.routes.snapshot.queryParamMap.get('id'),{headers : headers}).subscribe((res) => {
      this.res = res;
      console.log((this.res));
      var cast_prefer = '';
            this.res.caste.map((value, index) => {
                // console.log(value)
                this.caste_arr.push(value['id'])

                cast_prefer += (value['id']) + ',';
            })
              if (this.caste_arr.length === 461)
                this.caste_arr = ["0"]
      cast_prefer+='0';
      if(this.res.max_income>1000){
        this.res.max_income = this.res.max_income/100000;
      }
      if(this.res.min_income>1000){
        this.res.min_income = this.res.min_income/100000;
      }
      localStorage.setItem('min_age',(this.res.min_age).split('-')[0]);
      localStorage.setItem('max_age',(this.res.max_age).split('-')[0]);
      localStorage.setItem('min_income',this.res.min_income);
      ((localStorage.setItem('max_income',this.res.max_income)));
      ((localStorage.setItem('min_height',this.res.min_height)));
      ((localStorage.setItem('max_height',this.res.max_height)));
      ((localStorage.setItem('marital_status',this.res.marital_status)));
      ((localStorage.setItem('manglik',this.res.manglik)));
      ((localStorage.setItem('food_choice',this.res.food_choice)));
      ((localStorage.setItem('citizenship',this.res.citizenship)));
      ((localStorage.setItem('occupation',this.res.occupation)));
      ((localStorage.setItem('caste',cast_prefer)));
      if(this.res.gender===1)
        ((localStorage.setItem('prgender', '0')));
      else{
        ((localStorage.setItem('prgender', '1')));

      }
             console.log(localStorage.getItem('manglik'))
     
      this.EditClientPreferences = this._formBuilder.group({
      'min_age' : [2019-parseInt(localStorage.getItem('min_age'))],
      'max_age' : [2019-parseInt(localStorage.getItem('max_age'))],
      'min_income' : [(parseFloat(localStorage.getItem('min_income')))],
      'max_income' : [(parseFloat(localStorage.getItem('max_income')))],
      'min_height' : [localStorage.getItem('min_height')],
      'max_height' : [localStorage.getItem('max_height')],
      'marital_status' : [localStorage.getItem('marital_status')],
      'manglik' : [localStorage.getItem('manglik')],
      'food_choice' : [localStorage.getItem('food_choice')],
      'occupation' : [localStorage.getItem('occupation')],
      'citizenship' : [localStorage.getItem('citizenship')],
      'caste' : [this.caste_arr],
      'gender' : [localStorage.getItem('prgender')],
    });;

    })

  }


  ApplyFilter(){
      localStorage.setItem('filter','1')
      localStorage.setItem('page','1');
      // var maxheight = this.EditClientPreferences.value.min

      localStorage.setItem('min_age',(parseInt('2019')-parseInt(this.EditClientPreferences.value.min_age)).toString());
      localStorage.setItem('max_age',(parseInt('2019')-parseInt(this.EditClientPreferences.value.max_age)).toString());
      localStorage.setItem('min_income',(parseInt(this.EditClientPreferences.value.min_income)*100000).toString());
      ((localStorage.setItem('max_income',(parseInt(this.EditClientPreferences.value.max_income)*100000).toString())));
      localStorage.setItem('min_height',this.EditClientPreferences.value.min_height);   
      // console.log(this.EditClientPreferences.value.max_height)
      localStorage.setItem('max_height',this.EditClientPreferences.value.max_height);   

      if(this.EditClientPreferences.value.marital_status!=='3')
        localStorage.setItem('marital_status',this.EditClientPreferences.value.marital_status);
       else{
        localStorage.removeItem('marital_status');

       }          
      if(this.EditClientPreferences.value.manglik!=='2')
        localStorage.setItem('manglik',this.EditClientPreferences.value.manglik);   
       else{
        localStorage.removeItem('manglik');

       }          
      if(this.EditClientPreferences.value.food_choice!=='2')
        localStorage.setItem('food_choice',this.EditClientPreferences.value.food_choice);  
       else{
        localStorage.removeItem('food_choice');

       }          
       if(this.EditClientPreferences.value.occupation!=='2')
          localStorage.setItem('occupation',this.EditClientPreferences.value.occupation);   
       else{
        localStorage.removeItem('occupation');

       }          
       if(this.EditClientPreferences.value.citizenship!=='2')
          localStorage.setItem('citizenship',this.EditClientPreferences.value.citizenship); 
       else{
        localStorage.removeItem('citizenship');

       }          
       if(this.EditClientPreferences.value.caste && this.EditClientPreferences.value.caste.length>0 && this.EditClientPreferences.value.caste.toString()!=='0'){
         console.log("5555")
          localStorage.setItem('caste',this.EditClientPreferences.value.caste.toString());   
       }
       else{

         localStorage.setItem('caste','all')
       }

      localStorage.setItem('prgender',this.EditClientPreferences.value.gender);   
      // console.log(this.EditClientPreferences.value.caste!=='0')
      this.route.navigate(['/matches'],{ queryParams: { id:this.routes.snapshot.queryParamMap.get('id')}});
  
  }

}
