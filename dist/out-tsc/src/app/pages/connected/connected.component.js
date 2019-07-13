import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
var ConnectedComponent = /** @class */ (function () {
    function ConnectedComponent(http, router, config, modalService) {
        this.http = http;
        this.router = router;
        this.modalService = modalService;
        this.connect = [];
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
    }
    ConnectedComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/connected-interest?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (response) {
            _this.connect = response;
            console.log(_this.connect);
            for (var i = 0; i < _this.connect.length; i++) {
                if (_this.connect[i].matched_to.profile_photo === null) {
                    if (_this.connect[i].matched_to.gender === 0) {
                        _this.connect[i].matched_to.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                    }
                    else {
                        _this.connect[i].matched_to.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                    }
                }
                if (_this.connect[i].matched_to.marital_status == '0')
                    _this.connect[i].matched_to.marital = "Not Married";
                else
                    _this.connect[i].matched_to.marital = "Married";
                if (_this.connect[i].matched_to.manglik == 0)
                    _this.connect[i].matched_to.manglik = 'Non-Manglik';
                else
                    _this.connect[i].matched_to.manglik = 'Manglik';
                _this.connect[i].matched_to.inches = _this.connect[i].matched_to.height % 12;
                _this.connect[i].matched_to.feet = (_this.connect[i].matched_to.height - _this.connect[i].matched_to.inches) / 12;
            }
        });
    };
    ConnectedComponent.prototype.awaited = function () {
        this.router.navigate(['/awaited']);
    };
    ConnectedComponent.prototype.connected = function () {
        this.router.navigate(['/connected']);
    };
    ConnectedComponent.prototype.view_phone = function (client_id) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        console.log(client_id);
        this.http.get('http://matchmakerz.in/api/v1/client/matchmaker-contact?id=' + client_id, { headers: headers }).subscribe(function (response) {
            _this.matchmaker = response;
            console.log(response);
        });
    };
    ConnectedComponent.prototype.declined = function () {
        this.router.navigate(['/declined']);
    };
    ConnectedComponent.prototype.open = function (content, client_id) {
        var _this = this;
        console.log(client_id);
        this.modalService.open(content);
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        console.log(client_id);
        this.http.get('http://matchmakerz.in/api/v1/client/matchmaker-contact?id=' + client_id, { headers: headers }).subscribe(function (response) {
            _this.matchmaker = response;
            console.log(response);
        });
    };
    ConnectedComponent = tslib_1.__decorate([
        Component({
            selector: 'app-connected',
            templateUrl: './connected.component.html',
            styleUrls: ['./connected.component.scss'],
            providers: [NgbModalConfig, NgbModal]
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Router, NgbModalConfig, NgbModal])
    ], ConnectedComponent);
    return ConnectedComponent;
}());
export { ConnectedComponent };
//# sourceMappingURL=connected.component.js.map