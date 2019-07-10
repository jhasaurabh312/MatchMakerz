import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
var PlansComponent = /** @class */ (function () {
    function PlansComponent(http) {
        this.http = http;
        this.plans = [];
        this.result = [];
    }
    PlansComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/matchmaker/review_credits', { headers: headers }).subscribe(function (result) {
            _this.result = result;
            console.log(_this.result);
        });
        this.http.get('http://matchmakerz.in/api/v1/matchmaker/plans_for_existing', { headers: headers }).subscribe(function (res) {
            console.log(res);
            _this.plans = res["data"];
        });
    };
    PlansComponent = tslib_1.__decorate([
        Component({
            selector: 'app-plans',
            templateUrl: './plans.component.html',
            styleUrls: ['./plans.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PlansComponent);
    return PlansComponent;
}());
export { PlansComponent };
//# sourceMappingURL=plans.component.js.map