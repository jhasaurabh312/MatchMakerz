import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
var AwaitedComponent = /** @class */ (function () {
    function AwaitedComponent(http, router) {
        this.http = http;
        this.router = router;
        this.show1 = true;
        this.show2 = false;
        this.awaitedIn = [];
        this.staticProductDetail = [];
    }
    AwaitedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.incoming = false;
        this.outgoing = true;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/incoming-interest?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.awaitedIn = response;
            console.log('Incoming', _this.awaitedIn);
            if (_this.awaitedIn.length === 0) {
                _this.check = false;
                _this.check1 = true;
            }
            else {
                _this.check = true;
                _this.check1 = false;
            }
            for (var i = 0; i < _this.awaitedIn.length; i++) {
                if (_this.awaitedIn[i].matched_to.profile_photo == null) {
                    if (_this.awaitedIn[i].matched_to.gender === 0) {
                        _this.awaitedIn[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                    }
                    else {
                        _this.awaitedIn[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                    }
                }
                if (_this.awaitedIn[i].matched_to.marital_status == '0')
                    _this.awaitedIn[i].matched_to.marital = "Not Married";
                else
                    _this.awaitedIn[i].matched_to.marital = "Married";
                if (_this.awaitedIn[i].matched_to.manglik == 0)
                    _this.awaitedIn[i].matched_to.manglik = 'Non-Manglik';
                else
                    _this.awaitedIn[i].matched_to.manglik = 'Manglik';
                _this.awaitedIn[i].matched_to.inches = _this.awaitedIn[i].matched_to.height % 12;
                _this.awaitedIn[i].matched_to.feet = (_this.awaitedIn[i].matched_to.height - _this.awaitedIn[i].matched_to.inches) / 12;
            }
        });
        this.http.get('http://matchmakerz.in/api/v1/client/awaited-interest?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.staticProductDetail = response;
            console.log('outgoing', _this.staticProductDetail);
            if (_this.staticProductDetail.length === 0) {
                _this.check = false;
                _this.check1 = true;
            }
            else {
                _this.check = true;
                _this.check1 = false;
            }
            for (var i = 0; i < _this.staticProductDetail.length; i++) {
                if (_this.staticProductDetail[i].matched_to.profile_photo == null) {
                    if (_this.staticProductDetail[i].matched_to.gender === 0) {
                        _this.staticProductDetail[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                    }
                    else {
                        _this.staticProductDetail[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                    }
                }
                if (_this.staticProductDetail[i].matched_to.marital_status == '0')
                    _this.staticProductDetail[i].matched_to.marital = "Not Married";
                else
                    _this.staticProductDetail[i].matched_to.marital = "Married";
                if (_this.staticProductDetail[i].matched_to.manglik == 0)
                    _this.staticProductDetail[i].matched_to.manglik = 'Non-Manglik';
                else
                    _this.staticProductDetail[i].matched_to.manglik = 'Manglik';
                _this.staticProductDetail[i].matched_to.inches = _this.staticProductDetail[i].matched_to.height % 12;
                _this.staticProductDetail[i].matched_to.feet = (_this.staticProductDetail[i].matched_to.height - _this.staticProductDetail[i].matched_to.inches) / 12;
            }
        });
    };
    AwaitedComponent.prototype.ShowAwaited = function (e) {
        if (e === 'incoming') {
            this.incoming = true;
            this.outgoing = false;
        }
        else {
            this.incoming = false;
            this.outgoing = true;
        }
    };
    AwaitedComponent.prototype.awaited = function () {
        this.router.navigate(['/awaited']);
    };
    AwaitedComponent.prototype.connected = function () {
        this.router.navigate(['/connected']);
    };
    AwaitedComponent.prototype.declined = function () {
        this.router.navigate(['/declined']);
    };
    AwaitedComponent.prototype.accept = function (data) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        return this.http.get('http://matchmakerz.in/api/v1/client/statusaccept-interest?id=' + data, { headers: headers }).subscribe(function (result) {
            console.log(result);
        });
    };
    AwaitedComponent.prototype.decline = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/statusdecline-interest?id=' + data, { headers: headers }).subscribe(function (result) {
            console.log(result);
        });
        return this.http.get('http://matchmakerz.in/api/v1/client/awaited-interest?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.staticProductDetail = response;
            console.log('outgoing', _this.staticProductDetail);
            if (_this.staticProductDetail.length === 0) {
                _this.check = false;
                _this.check1 = true;
            }
            else {
                _this.check = true;
                _this.check1 = false;
            }
            for (var i = 0; i < _this.staticProductDetail.length; i++) {
                if (_this.staticProductDetail[i].matched_to.profile_photo == null) {
                    if (_this.staticProductDetail[i].matched_to.gender === 0) {
                        _this.staticProductDetail[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                    }
                    else {
                        _this.staticProductDetail[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                    }
                }
                if (_this.staticProductDetail[i].matched_to.marital_status == '0')
                    _this.staticProductDetail[i].matched_to.marital = "Not Married";
                else
                    _this.staticProductDetail[i].matched_to.marital = "Married";
                if (_this.staticProductDetail[i].matched_to.manglik == 0)
                    _this.staticProductDetail[i].matched_to.manglik = 'Non-Manglik';
                else
                    _this.staticProductDetail[i].matched_to.manglik = 'Manglik';
                _this.staticProductDetail[i].matched_to.inches = _this.staticProductDetail[i].matched_to.height % 12;
                _this.staticProductDetail[i].matched_to.feet = (_this.staticProductDetail[i].matched_to.height - _this.staticProductDetail[i].matched_to.inches) / 12;
            }
        });
    };
    AwaitedComponent = tslib_1.__decorate([
        Component({
            selector: 'app-awaited',
            templateUrl: './awaited.component.html',
            styleUrls: ['./awaited.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
    ], AwaitedComponent);
    return AwaitedComponent;
}());
export { AwaitedComponent };
//# sourceMappingURL=awaited.component.js.map