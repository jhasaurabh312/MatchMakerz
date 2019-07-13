import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
var GetOTPComponent = /** @class */ (function () {
    function GetOTPComponent(http, router) {
        this.http = http;
        this.router = router;
        this.phone_number = "";
    }
    GetOTPComponent.prototype.ngOnInit = function () {
    };
    GetOTPComponent.prototype.getOTP = function (data) {
        var _this = this;
        event.preventDefault();
        localStorage.setItem('signup_phone_number', data.phone_number);
        this.http.get('http://matchmakerz.in/api/v1/matchmaker/loginotp?phone_number=' + data.phone_number).subscribe(function (response) {
            _this.response = response;
            console.log(_this.response);
            // window.location.href=('/login');
            _this.router.navigate(['/login']);
        });
    };
    GetOTPComponent = tslib_1.__decorate([
        Component({
            selector: 'app-get-otp',
            templateUrl: './get-otp.component.html',
            styleUrls: ['./get-otp.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
    ], GetOTPComponent);
    return GetOTPComponent;
}());
export { GetOTPComponent };
//# sourceMappingURL=get-otp.component.js.map