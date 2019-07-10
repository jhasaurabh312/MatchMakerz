import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
var ShortlistedComponent = /** @class */ (function () {
    function ShortlistedComponent(http) {
        this.http = http;
        this.shortlistedTotal = [];
        this.shortlisted = [];
    }
    ShortlistedComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/total-shortlist?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (res) {
            _this.shortlistedTotal = res;
            console.log(_this.shortlistedTotal);
        });
        this.http.get('http://matchmakerz.in/api/v1/client/shortList?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (res) {
            _this.shortlisted = res;
            console.log(_this.shortlisted);
            var l = _this.shortlisted.length;
            if (l == 0) {
                _this.check1 = true;
                _this.check = false;
            }
            else {
                _this.check = true;
                _this.check1 = false;
            }
            for (var i = 0; i < l; i++) {
                if (_this.shortlisted[i].shortlist_to.profile_photo == null) {
                    if (_this.shortlisted[i].shortlist_to.gender === 0) {
                        _this.shortlisted[i].shortlist_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                    }
                    else {
                        _this.shortlisted[i].shortlist_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                    }
                }
                if (_this.shortlisted[i].shortlist_to.marital_status == '0')
                    _this.shortlisted[i].shortlist_to.marital = "Not Married";
                else
                    _this.shortlisted[i].shortlist_to.marital = "Married";
                if (_this.shortlisted[i].shortlist_to.manglik == 0)
                    _this.shortlisted[i].shortlist_to.manglik = 'Non-Manglik';
                else
                    _this.shortlisted[i].shortlist_to.manglik = 'Manglik';
                _this.shortlisted[i].shortlist_to.inches = _this.shortlisted[i].shortlist_to.height % 12;
                _this.shortlisted[i].shortlist_to.feet = (_this.shortlisted[i].shortlist_to.height - _this.shortlisted[i].shortlist_to.inches) / 12;
            }
        });
    };
    ShortlistedComponent.prototype.DeleteShorlist = function (data) {
        var NewProfile = new FormData();
        NewProfile.append('shortlist_id', data);
        console.log(NewProfile);
        return this.http.put('http://matchmakerz.in/api/v1/client/shortList', NewProfile, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            console.log(response);
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    ShortlistedComponent.prototype.showInterestCandidate = function (data) {
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
            console.log(response);
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    ShortlistedComponent = tslib_1.__decorate([
        Component({
            selector: 'app-shortlisted',
            templateUrl: './shortlisted.component.html',
            styleUrls: ['./shortlisted.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ShortlistedComponent);
    return ShortlistedComponent;
}());
export { ShortlistedComponent };
//# sourceMappingURL=shortlisted.component.js.map