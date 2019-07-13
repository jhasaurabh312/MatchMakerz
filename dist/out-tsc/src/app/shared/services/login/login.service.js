import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.login = function (data) {
        return this.http.post('http://matchmakerz.in/api/v1/matchmaker/login', data);
    };
    LoginService.prototype.register = function (data) {
        return this.http.post('http://matchmakerz.in/api/v1/matchmaker/register', data);
    };
    LoginService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LoginService);
    return LoginService;
}());
export { LoginService };
//# sourceMappingURL=login.service.js.map