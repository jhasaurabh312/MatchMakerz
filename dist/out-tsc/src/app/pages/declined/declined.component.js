import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
var DeclinedComponent = /** @class */ (function () {
    function DeclinedComponent(http, router) {
        this.http = http;
        this.router = router;
        this.show = false;
        this.awaitedIn = [];
        this.awaitedOut = [];
        this.outgoing = true;
        this.incoming = false;
    }
    DeclinedComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.male = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
        this.female = 'http://www.pranawellness.in/Images/female.png';
        this.http.get('http://matchmakerz.in/api/v1/client/declined-interest-incoming?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.awaitedIn = response;
            console.log(_this.awaitedIn);
            for (var i = 0; i < _this.awaitedIn.length; i++) {
                if (_this.awaitedIn[i].matched_to.marital_status == '0')
                    _this.awaitedIn[i].matched_to.marital = "Not Married";
                else
                    _this.awaitedIn[i].matched_to.marital = "Married";
                _this.awaitedIn[i].matched_to.inches = _this.awaitedIn[i].matched_to.height % 12;
                _this.awaitedIn[i].matched_to.feet = (_this.awaitedIn[i].matched_to.height - _this.awaitedIn[i].matched_to.inches) / 12;
            }
        });
        this.http.get('http://matchmakerz.in/api/v1/client/declined-interest?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.awaitedOut = response;
            console.log(_this.awaitedOut);
            for (var i = 0; i < _this.awaitedOut.length; i++) {
                if (_this.awaitedOut[i].matched_to.marital_status == '0')
                    _this.awaitedOut[i].matched_to.marital = "Not Married";
                else
                    _this.awaitedOut[i].matched_to.marital = "Married";
                _this.awaitedOut[i].matched_to.inches = _this.awaitedOut[i].matched_to.height % 12;
                _this.awaitedOut[i].matched_to.feet = (_this.awaitedOut[i].matched_to.height - _this.awaitedOut[i].matched_to.inches) / 12;
            }
        });
    };
    DeclinedComponent.prototype.awaited = function () {
        this.router.navigate(['/awaited']);
    };
    DeclinedComponent.prototype.ShowDeclined = function (e) {
        if (e === 'incoming') {
            this.incoming = true;
            this.outgoing = false;
        }
        else {
            this.incoming = false;
            this.outgoing = true;
        }
    };
    DeclinedComponent.prototype.connected = function () {
        this.router.navigate(['/connected']);
    };
    DeclinedComponent.prototype.declined = function () {
        this.router.navigate(['/declined']);
    };
    DeclinedComponent.prototype.accept = function (data) {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        return this.http.get('http://matchmakerz.in/api/v1/client/statusaccept-interest?id=' + data, { headers: headers }).subscribe(function (result) {
            console.log(result);
        });
    };
    DeclinedComponent.prototype.decline = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/statusdecline-interest?id=' + data, { headers: headers }).subscribe(function (result) {
            console.log(result);
        });
        this.http.get('http://matchmakerz.in/api/v1/client/declined-interest-incoming?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.awaitedIn = response;
            console.log(_this.awaitedIn);
        });
        this.http.get('http://matchmakerz.in/api/v1/client/declined-interest?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.awaitedOut = response;
            console.log(_this.awaitedOut);
        });
    };
    DeclinedComponent = tslib_1.__decorate([
        Component({
            selector: 'app-declined',
            templateUrl: './declined.component.html',
            styleUrls: ['./declined.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
    ], DeclinedComponent);
    return DeclinedComponent;
}());
export { DeclinedComponent };
//# sourceMappingURL=declined.component.js.map