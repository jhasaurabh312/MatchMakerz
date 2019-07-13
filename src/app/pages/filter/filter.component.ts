import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';
import {
    Router
} from '@angular/router';
import {
    ActivatedRoute
} from '@angular/router';


@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    public filtered: any = [];
    EditClientPreferences: FormGroup;
    error: any;
    data: any;
    page: number;
    a: string;
    selectedValue: any = '0';
    res: any = [];
    castes: any;
    caste_arr: any = [];
    client_pref: any = {
        'min_age': '',
        'max_age': '',
        'min_income': '',
        'max_income': '',
        'max_height': '',
        'marital_status': '',
        'manglik': '',
        'food_choice': '',
        'occupation': '',
        'citizenship': '',
        'caste': '',
    }

    //  = [
    //   {value: 'steak-0', viewValue: 'Steak'},
    //   {value: 'pizza-1', viewValue: 'Pizza'},
    //   {value: 'tacos-2', viewValue: 'Tacos'}
    // ];
    constructor(private _formBuilder: FormBuilder, private http: HttpClient, public route: Router, private routes: ActivatedRoute) {
        // console.log(2019-parseInt(localStorage.getItem('min_age')))

        // for(let i =)
        var castes = [];

        if (this.caste_arr !== null) {
            if (this.caste_arr.length === 461)
                this.caste_arr = ["0"]
        }
        console.log(castes)
        this.EditClientPreferences = this._formBuilder.group({
            'min_age': [2019 - parseInt(this.client_pref.min_age)],
            'max_age': [2019 - parseInt(this.client_pref.max_age)],
            'min_income': [this.client_pref.min_income],
            'max_income': [(this.client_pref.max_income)],
            'min_height': [this.client_pref.min_height],
            'max_height': [this.client_pref.max_height],
            'marital_status': [this.client_pref.marital_status],
            'manglik': [this.client_pref.manglik],
            'food_choice': [this.client_pref.food_choice],
            'occupation': [this.client_pref.occupation],
            'citizenship': [this.client_pref.citizenshin],
            'caste': [castes],
            'gender': [localStorage.getItem('prgender')],

        });;
    }
    // 76fd58929682ca212cfeef00ecd6806885d73ef6
    ngOnInit() {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        })

        this.http.get('http://matchmakerz.in/api/v1/client/castes', {
            headers: headers
        }).subscribe((res) => {
            console.log(res)
            this.castes = res

        })
        this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id=' + this.routes.snapshot.queryParamMap.get('id'), {
            headers: headers
        }).subscribe((res) => {

            this.res = res;
            if (this.res.status === 0)
                this.res = [];
            // else
            //     this.res = []
            console.log((this.res));
            var cast_prefer = '';
            this.client_pref = res;
            if (this.res.max_income > 1000) {
                this.res.max_income = this.res.max_income / 100000;
            }
            if (this.res.min_income > 1000) {
                this.res.min_income = this.res.min_income / 100000;
            }
            if (this.res.caste) {
                this.res.caste.map((value, index) => {
                    // console.log(value)
                    this.caste_arr.push(value['id'])

                    cast_prefer += (value['id']) + ',';
                })
            }
            if (this.caste_arr.length === 461)
                this.caste_arr = ["0"]
            console.log(this.caste_arr)
            cast_prefer = cast_prefer.substring(0, cast_prefer.length - 1);
            console.log(this.client_pref)
            // console.log(this.client_pref.occupation!==null ? (this.client_pref.occupation).toString() : '')
            this.EditClientPreferences = this._formBuilder.group({
                'min_age': [2019 - parseInt(this.client_pref.min_age)],
                'max_age': [2019 - parseInt(this.client_pref.max_age)],
                'min_income': [this.client_pref.min_income],
                'max_income': [(this.client_pref.max_income)],
                   'min_height': [this.client_pref.min_height && this.client_pref.min_height!==null ? (this.client_pref.min_height).toString() : ''],
                    'max_height': [this.client_pref.min_height && this.client_pref.max_height!==null ? (this.client_pref.max_height).toString():''],
                    'marital_status': [this.client_pref.min_height && this.client_pref.marital_status!==null ? (this.client_pref.marital_status).toString():''],
                    'manglik': [this.client_pref.min_height && this.client_pref.manglik!==null ? (this.client_pref.manglik).toString():''],
                    'food_choice': [this.client_pref.min_height && this.client_pref.food_choice!==null ? (this.client_pref.food_choice).toString():''],
                    'occupation': [this.client_pref.min_height && this.client_pref.occupation!==null ? (this.client_pref.occupation).toString():''],
                    'citizenship': [this.client_pref.min_height && this.client_pref.citizenship!==null ? (this.client_pref.citizenship).toString():''],
                'caste': [this.caste_arr],
                'gender': [localStorage.getItem('prgender')],

            });;
            localStorage.setItem('min_age', (this.res.min_age ? (this.res.min_age).split('-')[0]:''));
            localStorage.setItem('max_age', (this.res.min_age ? (this.res.max_age).split('-')[0]:''));
            localStorage.setItem('min_income', this.res.min_income);
            ((localStorage.setItem('max_income', this.res.max_income)));
            ((localStorage.setItem('min_height', this.res.min_height)));
            ((localStorage.setItem('max_height', this.res.max_height)));
            ((localStorage.setItem('marital_status', this.res.marital_status)));
            ((localStorage.setItem('manglik', this.res.manglik)));
            ((localStorage.setItem('food_choice', this.res.food_choice)));
            ((localStorage.setItem('citizenship', this.res.citizenship)));
            ((localStorage.setItem('occupation', this.res.occupation)));
            ((localStorage.setItem('caste', cast_prefer)));
            if (this.res.gender === 1)
                ((localStorage.setItem('prgender', '0')));
            else {
                ((localStorage.setItem('prgender', '1')));

            }

            //   this.EditClientPreferences = this._formBuilder.group({
            //   'min_age' : [2019-parseInt(localStorage.getItem('min_age'))],
            //   'max_age' : [2019-parseInt(localStorage.getItem('max_age'))],
            //   'min_income' : [(parseFloat(localStorage.getItem('min_income')))],
            //   'max_income' : [(parseFloat(localStorage.getItem('max_income')))],
            //   'min_height' : [localStorage.getItem('min_height')],
            //   'max_height' : [localStorage.getItem('max_height')],
            //   'marital_status' : [localStorage.getItem('marital_status')],
            //   'manglik' : [localStorage.getItem('manglik')],
            //   'food_choice' : [localStorage.getItem('food_choice')],
            //   'occupation' : [localStorage.getItem('occupation')],
            //   'citizenship' : [localStorage.getItem('citizenship')],
            //   'caste' : [this.caste_arr],
            // 'gender' : [localStorage.getItem('prgender')],
            // });;

        })

    }


    ApplyFilter() {
        localStorage.setItem('filter', '1')
        localStorage.setItem('page', '1');
        // var maxheight = this.EditClientPreferences.value.min

        localStorage.setItem('min_age', (parseInt('2019') - parseInt(this.EditClientPreferences.value.min_age)).toString());
        localStorage.setItem('max_age', (parseInt('2019') - parseInt(this.EditClientPreferences.value.max_age)).toString());
        localStorage.setItem('min_income', (parseInt(this.EditClientPreferences.value.min_income)).toString());
        ((localStorage.setItem('max_income', (parseInt(this.EditClientPreferences.value.max_income)).toString())));
        localStorage.setItem('min_height', this.EditClientPreferences.value.min_height);
        // console.log(this.EditClientPreferences.value.max_height)
        localStorage.setItem('max_height', this.EditClientPreferences.value.max_height);

        if (this.EditClientPreferences.value.marital_status !== '3')
            localStorage.setItem('marital_status', this.EditClientPreferences.value.marital_status);
        else {
            localStorage.removeItem('marital_status');

        }
        if (this.EditClientPreferences.value.manglik !== '2')
            localStorage.setItem('manglik', this.EditClientPreferences.value.manglik);
        else {
            localStorage.removeItem('manglik');

        }
        if (this.EditClientPreferences.value.food_choice !== '2')
            localStorage.setItem('food_choice', this.EditClientPreferences.value.food_choice);
        else {
            localStorage.removeItem('food_choice');

        }
        if (this.EditClientPreferences.value.occupation !== '6')
            localStorage.setItem('occupation', this.EditClientPreferences.value.occupation);
        else {
            localStorage.removeItem('occupation');

        }
        if (this.EditClientPreferences.value.citizenship !== '2')
            localStorage.setItem('citizenship', this.EditClientPreferences.value.citizenship);
        else {
            localStorage.removeItem('citizenship');

        }
        if (this.EditClientPreferences.value.caste && this.EditClientPreferences.value.caste.length > 0 && this.EditClientPreferences.value.caste.toString() !== '0') {
            localStorage.setItem('caste', this.EditClientPreferences.value.caste.toString());
        } else {

            localStorage.setItem('caste', 'all')
        }
        console.log(this.routes.snapshot.queryParamMap.get('id'))
        localStorage.setItem('prgender', this.EditClientPreferences.value.gender);
        // console.log(this.EditClientPreferences.value.caste!=='0')
        this.route.navigate(['/matches'], {
            queryParams: {
                id: this.routes.snapshot.queryParamMap.get('id')
            }
        });

    }

}