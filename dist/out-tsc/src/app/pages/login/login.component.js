import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_formBuilder, authService, router, http) {
        this._formBuilder = _formBuilder;
        this.authService = authService;
        this.router = router;
        this.http = http;
        this.loginDetails = this._formBuilder.group({
            'email': [localStorage.getItem('signup_phone_number')],
            'password': [''],
        });
        ;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var countDownDate = new Date().getTime() + 61000;
        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            document.getElementById("timer").innerHTML = seconds + "sec";
            // console.log( document.getElementById("timer").innerHTML);  
            if (distance <= 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "expired";
            }
        }, 1000);
    };
    LoginComponent.prototype.submitLogin = function () {
        var _this = this;
        var loginData = new FormData();
        loginData.append('phone_number', this.loginDetails.value.email);
        loginData.append('otp', this.loginDetails.value.password);
        console.log(loginData);
        this.authService.login(loginData).subscribe(function (suc) {
            _this.response = suc;
            console.log(suc);
            if (_this.response.status === 1) {
                localStorage.setItem('token', _this.response.token);
                console.log(localStorage.getItem('token'));
                _this.router.navigate(['/clients']);
                // window.location.href=('/my-profile');
            }
            else if (_this.response.status === 3) {
                _this.router.navigate(['/signup']);
            }
            else if (_this.response.status === 2) {
                alert("Wait while your profile is being verified ");
            }
        }, function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        });
    };
    LoginComponent.prototype.resendOTP = function () {
        var _this = this;
        event.preventDefault();
        this.http.get('http://matchmakerz.in/api/v1/matchmaker/loginotp?phone_number=' + localStorage.getItem('mpn')).subscribe(function (response) {
            alert('OTP Resent !!!');
            _this.router.navigate(['/login']);
        });
    };
    LoginComponent.prototype.EditNumber = function () {
        this.router.navigate(['/get-otp']);
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, LoginService, Router, HttpClient])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//7210644426
//# sourceMappingURL=login.component.js.map