import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FilterComponent } from '../filter/filter.component';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SnackService } from '../../shared/services/snack.service';
var MatchesComponent = /** @class */ (function () {
    function MatchesComponent(http, filtercomp, route, snack) {
        this.http = http;
        this.filtercomp = filtercomp;
        this.route = route;
        this.snack = snack;
        this.load_more = false;
        this.shortlistedTotal = [];
        this.staticProductDetail = [];
        this.res = [];
        localStorage.setItem('page', '1');
    }
    MatchesComponent.prototype.getData = function () {
        var _this = this;
        debounceTime(10000);
        this.show = false;
        this.load_more = true;
        var URL = 'http://matchmakerz.in/api/v1/client/filterMatches?page=' + localStorage.getItem('page');
        console.log(localStorage.getItem('min_age'));
        if (localStorage.getItem('min_age') !== null) {
            console.log("****");
            URL += '&min_age=' + localStorage.getItem('min_age');
            // localStorage.removeItem('min_age')
        }
        if (localStorage.getItem('max_age') !== null) {
            URL += '&max_age=' + localStorage.getItem('max_age');
            // localStorage.removeItem('max_age')
        }
        if (localStorage.getItem('min_income') !== null) {
            URL += '&min_income=' + localStorage.getItem('min_income');
            // localStorage.removeItem('min_income')
        }
        if (localStorage.getItem('max_income') !== null) {
            URL += '&max_income=' + localStorage.getItem('max_income');
            // localStorage.removeItem('max_income')
        }
        if (localStorage.getItem('min_height') !== null) {
            URL += '&min_height=' + localStorage.getItem('min_height');
            // localStorage.removeItem('min_height')
        }
        if (localStorage.getItem('max_height') !== null) {
            URL += '&max_height=' + localStorage.getItem('max_height');
            // localStorage.removeItem('max_height')
        }
        if (localStorage.getItem('marital_status') !== null) {
            URL += '&marital_status=' + localStorage.getItem('marital_status');
            // localStorage.removeItem('marital_status')
        }
        if (localStorage.getItem('manglik') !== null) {
            URL += '&manglik=' + localStorage.getItem('manglik');
            // localStorage.removeItem('manglik')
        }
        if (localStorage.getItem('food_choice') !== null) {
            URL += '&food_choice=' + localStorage.getItem('food_choice');
            // localStorage.removeItem('food_choice')
        }
        if (localStorage.getItem('occupation') !== null) {
            URL += '&occupation=' + localStorage.getItem('occupation');
            // localStorage.removeItem('occupation')
        }
        if (localStorage.getItem('caste') !== null && localStorage.getItem('caste') !== '0') {
            if (localStorage.getItem('caste') !== 'all') {
                URL += '&caste=' + localStorage.getItem('caste');
            }
            // localStorage.removeItem('caste')
        }
        if (localStorage.getItem('prgender') !== null) {
            URL += '&gender=' + localStorage.getItem('prgender');
            // localStorage.removeItem('prgender')
        }
        if (localStorage.getItem('citizenship') !== null) {
            URL += '&citizenship=' + localStorage.getItem('citizenship');
            // localStorage.removeItem('prgender')
        }
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        console.log(URL);
        this.http.get(URL, {
            headers: headers
        }).pipe(debounceTime(1000)).subscribe(function (response) {
            _this.response = response;
            _this.staticProductDetail = _this.staticProductDetail.concat(_this.response.results);
            console.log(response);
            // let l = this.staticProductDetail.length;
            //   if(l<20)
            //   this.show = false;
            //   else
            //   this.show = true; 
            if (_this.response.links.next === null) {
                _this.show = false;
                _this.load_more = false;
                localStorage.removeItem('min_age');
                localStorage.setItem('filter', '0');
                localStorage.removeItem('max_age');
                localStorage.removeItem('min_income');
                localStorage.removeItem('max_income');
                localStorage.removeItem('min_height');
                localStorage.removeItem('max_height');
                localStorage.removeItem('marital_status');
                localStorage.removeItem('manglik');
                localStorage.removeItem('food_choice');
                localStorage.removeItem('occupation');
                localStorage.removeItem('citizenship');
                localStorage.removeItem('caste');
                localStorage.removeItem('prgender');
            }
            for (var i = 0; i < _this.staticProductDetail.length; i++) {
                if (_this.staticProductDetail[i].profile_photo === null) {
                    if (_this.staticProductDetail[i].gender === 0) {
                        _this.staticProductDetail[i].profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                    }
                    else {
                        _this.staticProductDetail[i].profile_photo = 'http://www.pranawellness.in/Images/female.png';
                    }
                }
                if (_this.staticProductDetail[i].marital_status == '0')
                    _this.staticProductDetail[i].marital = "Not Married";
                else
                    _this.staticProductDetail[i].marital = "Married";
                if (_this.staticProductDetail[i].manglik == 0)
                    _this.staticProductDetail[i].manglik = 'Non-Manglik';
                else if (_this.staticProductDetail[i].manglik == 1)
                    _this.staticProductDetail[i].manglik = 'Manglik';
                else
                    _this.staticProductDetail[i].manglik == 'Anshik Manglik';
                if (_this.staticProductDetail[i].occupation == '0')
                    _this.staticProductDetail[i].occupation = 'Not Working';
                else if (_this.staticProductDetail[i].occupation == '1')
                    _this.staticProductDetail[i].occupation = 'Private Job';
                else if (_this.staticProductDetail[i].occupation == '2')
                    _this.staticProductDetail[i].occupation = 'Self Employed';
                else if (_this.staticProductDetail[i].occupation == '3')
                    _this.staticProductDetail[i].occupation = 'Government Job';
                else if (_this.staticProductDetail[i].occupation == '4')
                    _this.staticProductDetail[i].occupation = 'Doctor';
                else
                    _this.staticProductDetail[i].occupation = 'Teacher';
                _this.staticProductDetail[i].inches = _this.staticProductDetail[i].height % 12;
                _this.staticProductDetail[i].feet = (_this.staticProductDetail[i].height - _this.staticProductDetail[i].inches) / 12;
            }
        });
        this.http.get('http://matchmakerz.in/api/v1/client/total-shortlist?id=' + localStorage.getItem('clientId'), {
            headers: headers
        }).pipe(debounceTime(1000)).subscribe(function (res) {
            _this.shortlistedTotal = res;
            console.log(_this.shortlistedTotal);
        });
        this.show = true;
        this.load_more = false;
    };
    MatchesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        if (localStorage.getItem('filter') === '0') {
            console.log("888888");
            this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id=' + localStorage.getItem('clientId'), {
                headers: headers
            }).pipe(debounceTime(-1000)).subscribe(function (res) {
                _this.res = res;
                console.log((_this.res));
                var cast_prefer = '';
                _this.res.caste.map(function (value, index) {
                    // console.log(value)
                    cast_prefer += (value['id']) + ',';
                });
                cast_prefer += '0';
                if (_this.res.min_age !== null)
                    localStorage.setItem('min_age', (_this.res.min_age).split('-')[0]);
                if (_this.res.max_age !== null)
                    localStorage.setItem('max_age', (_this.res.max_age).split('-')[0]);
                if (_this.res.min_income !== null)
                    localStorage.setItem('min_income', _this.res.min_income);
                if (_this.res.max_income !== null)
                    ((localStorage.setItem('max_income', _this.res.max_income)));
                if (_this.res.min_height !== null)
                    ((localStorage.setItem('min_height', _this.res.min_height)));
                if (_this.res.max_height !== null)
                    ((localStorage.setItem('max_height', _this.res.max_height)));
                if (_this.res.marital_status !== null)
                    ((localStorage.setItem('marital_status', _this.res.marital_status)));
                if (_this.res.manglik !== null)
                    ((localStorage.setItem('manglik', _this.res.manglik)));
                if (_this.res.food_choice !== null)
                    ((localStorage.setItem('food_choice', _this.res.food_choice)));
                if (_this.res.citizenship !== null)
                    ((localStorage.setItem('citizenship', _this.res.citizenship)));
                if (_this.res.occupation !== null)
                    ((localStorage.setItem('occupation', _this.res.occupation)));
                if (cast_prefer !== null)
                    ((localStorage.setItem('caste', cast_prefer)));
                // if(this.res.gender === 1)
                //   ((localStorage.setItem('prgender', this.res.gender)));
                if (localStorage.getItem('gender') === '0') {
                    ((localStorage.setItem('prgender', '1')));
                }
                else {
                    ((localStorage.setItem('prgender', '0')));
                }
                _this.getData();
            });
        }
        else {
            this.getData();
        }
    };
    MatchesComponent.prototype.shortlistCandidate = function (data) {
        var _this = this;
        this.a = parseInt(localStorage.getItem('clientId'));
        var NewProfile = new FormData();
        NewProfile.append('shortlist_to', data);
        NewProfile.append('shortlist_for', this.a);
        console.log(NewProfile);
        return this.http.post('http://matchmakerz.in/api/v1/client/shortList', NewProfile, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            if (response.status === 1) {
                _this.snack.openSnackBar(response.message, 'success');
            }
            else {
                _this.snack.openSnackBar(response.message, 'error');
            }
            console.log(response);
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    MatchesComponent.prototype.showInterestCandidate = function (data) {
        var _this = this;
        this.a = parseInt(localStorage.getItem('clientId'));
        var Data = new FormData();
        Data.append('showInterest_for', this.a);
        Data.append('showInterest_to', data);
        console.log(Data);
        return this.http.post('http://matchmakerz.in/api/v1/client/showInterest', Data, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            if (response.status === 1) {
                _this.snack.openSnackBar(response.message, 'success');
            }
            else {
                _this.snack.openSnackBar(response.message, 'error');
            }
            console.log(response);
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    MatchesComponent.prototype.getshortlisted = function () {
        this.route.navigate(['/shortlisted']);
    };
    MatchesComponent.prototype.filter = function () {
        this.route.navigate(['/filter']);
    };
    MatchesComponent.prototype.getProfile = function (data) {
        localStorage.setItem('clientId', data);
        this.route.navigate(['/client-profile']);
    };
    MatchesComponent.prototype.GetMore = function () {
        console.log("********");
        this.show = false;
        this.load_more = true;
        var page = parseInt(localStorage.getItem('page')) + 1;
        localStorage.setItem('page', page.toString());
        this.getData();
    };
    MatchesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-matches',
            templateUrl: './matches.component.html',
            styleUrls: ['./matches.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, FilterComponent, Router, SnackService])
    ], MatchesComponent);
    return MatchesComponent;
}());
export { MatchesComponent };
//# sourceMappingURL=matches.component.js.map