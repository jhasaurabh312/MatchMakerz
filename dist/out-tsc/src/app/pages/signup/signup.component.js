import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(_formBuilder, authService, router, http) {
        this._formBuilder = _formBuilder;
        this.authService = authService;
        this.router = router;
        this.http = http;
        this.loginData = [];
        this.signupDetails = this._formBuilder.group({
            'first_name': [localStorage.getItem('signup_first_name')],
            'last_name': [localStorage.getItem('signup_last_name')],
            'age': [localStorage.getItem('signup_age')],
            'gender': [localStorage.getItem('signup_gender')],
            'matchmaker_type': [localStorage.getItem('signup_matchmaker_type')],
            'referred_by': [localStorage.getItem('signup_referred_by')],
            'whatsapp_number': [localStorage.getItem('signup_whatsapp_number')],
            'about': [localStorage.getItem('signup_about')],
            'phone_number': [localStorage.getItem('signup_phone_number')],
            'unique_about': [localStorage.getItem('signup_unique_about')],
            'specialization': [localStorage.getItem('signup_specialization')],
            'password': [''],
            'location': [''],
            'lattitude': [''],
            'longitude': [''],
        });
        ;
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.signup = function () {
        var _this = this;
        var loginData = new FormData();
        localStorage.setItem('signup_first_name', this.signupDetails.value.first_name);
        localStorage.setItem('signup_last_name', this.signupDetails.value.last_name);
        localStorage.setItem('signup_age', this.signupDetails.value.age);
        localStorage.setItem('signup_gender', this.signupDetails.value.gender);
        localStorage.setItem('signup_referred_by', this.signupDetails.value.referred_by);
        localStorage.setItem('signup_whatsapp_number', this.signupDetails.value.whatsapp_number);
        localStorage.setItem('signup_about', this.signupDetails.value.about);
        localStorage.setItem('signup_phone_number', this.signupDetails.value.phone_number);
        localStorage.setItem('signup_unique_about', this.signupDetails.value.unique_about);
        localStorage.setItem('signup_specialization', this.signupDetails.value.specialization);
        localStorage.setItem('signup_matchmaker_type', this.signupDetails.value.matchmaker_type);
        if (this.signupDetails.value.referred_by == null || this.signupDetails.value.referred_by === '')
            this.signupDetails.value.referred_by = 'na';
        loginData.append('first_name', this.signupDetails.value.first_name),
            loginData.append('last_name', this.signupDetails.value.last_name),
            loginData.append('age', this.signupDetails.value.age),
            loginData.append('gender', this.signupDetails.value.gender),
            loginData.append('referred_by', this.signupDetails.value.referred_by),
            loginData.append('whatsapp_number', this.signupDetails.value.whatsapp_number),
            loginData.append('about', this.signupDetails.value.about),
            loginData.append('phone_number', this.signupDetails.value.phone_number),
            loginData.append('unique_about', this.signupDetails.value.unique_about),
            loginData.append('specialization', this.signupDetails.value.specialization),
            loginData.append('matchmaker_type', this.signupDetails.value.matchmaker_type),
            loginData.append('password', 'XXX'),
            loginData.append('location', 'NA'),
            loginData.append('longitude', 'NA'),
            loginData.append('lattitude', 'NA');
        console.log(loginData);
        return this.http.post('http://matchmakerz.in/api/v1/matchmaker/register', loginData).subscribe(function (response) {
            _this.data = response;
            console.log(_this.data);
            if (_this.data.status === 1) {
                localStorage.setItem('token', _this.data.auth_token);
                _this.router.navigate(['/my-profile']);
            }
        });
    };
    SignupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, LoginService, Router, HttpClient])
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
// phone_number,
// first_name
// last_name,
// about,
// unique_about,
// specialization,
// gender,
// age,
// referred_by,
// whatsapp_number
//# sourceMappingURL=signup.component.js.map