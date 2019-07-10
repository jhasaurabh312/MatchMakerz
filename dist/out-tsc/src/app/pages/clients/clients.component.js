import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
var ClientsComponent = /** @class */ (function () {
    function ClientsComponent(http, router) {
        this.http = http;
        this.router = router;
        this.load_more = false;
        this.staticProductDetail = [];
        this.staticLoadProductDetail = [];
        this.response = [];
        this.load_response = [];
        this.clients = true;
        this.my_profile = false;
        this.notices = [];
    }
    // constructor(private modalService: NgbModal) {}
    ClientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.male = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
        // 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
        this.female = 'http://www.pranawellness.in/Images/female.png';
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/list?id=99999999999', { headers: headers }).subscribe(function (response) {
            _this.staticProductDetail = response;
            console.log(_this.staticProductDetail);
            if (_this.staticProductDetail.length === 0) {
                _this.check = false;
                _this.check1 = true;
            }
            else {
                _this.check = true;
                _this.check1 = false;
            }
            var l = _this.staticProductDetail.length;
            if (l < 20)
                _this.show = false;
            else
                _this.show = true;
            // console.log(l, this.show); 
            for (var i = 0; i < l; i++) {
                // console.log(this.staticLoadProductDetail)
                if (_this.staticProductDetail[i].profile_photo == null) {
                    if (_this.staticProductDetail[i].gender === 1)
                        _this.staticProductDetail[i].profile_photo = _this.female;
                    else {
                        _this.staticProductDetail[i].profile_photo = _this.male;
                    }
                }
                console.log(_this.staticProductDetail[i].profile_photo);
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
            localStorage.setItem('lastClientId', _this.staticProductDetail[l - 1].id);
        });
        this.http.get('http://matchmakerz.in/api/v1/client/notifications', { headers: headers }).subscribe(function (response) {
            _this.notices = response.notification;
            console.log(_this.notices);
            _this.notices.reverse();
        });
    };
    ClientsComponent.prototype.getActivity = function (data) {
        localStorage.setItem('clientId', data);
        this.router.navigate(['/awaited']);
    };
    ClientsComponent.prototype.getMatches = function (data, gender) {
        localStorage.setItem('clientId', data);
        localStorage.setItem('filter', '0');
        localStorage.setItem('gender', gender);
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
        this.router.navigate(['/matches']);
    };
    ClientsComponent.prototype.getProfile = function (data) {
        localStorage.setItem('clientId', data);
        this.router.navigate(['/client-profile']);
    };
    ClientsComponent.prototype.AddClient = function () {
        this.router.navigate(['/personal-details']);
    };
    ClientsComponent.prototype.plans = function () {
        this.router.navigate(['/plans']);
    };
    ClientsComponent.prototype.ActiveBorder = function (e) {
        if (e === 'my_profile') {
            this.my_profile = true;
            this.clients = false;
        }
        else {
            this.my_profile = !true;
            this.clients = !false;
        }
    };
    ClientsComponent.prototype.GetMore = function () {
        var _this = this;
        // console.log("** get more **")
        // console.log(this.staticProductDetail.length)
        this.load_more = true;
        this.show = false;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        return this.http.get('http://matchmakerz.in/api/v1/client/list?id=' + localStorage.getItem('lastClientId'), { headers: headers }).subscribe(function (load_response) {
            console.log((load_response));
            console.log(typeof (_this.staticProductDetail));
            _this.staticLoadProductDetail = load_response;
            _this.staticProductDetail = _this.staticProductDetail.slice();
            _this.staticProductDetail = _this.staticProductDetail.concat(_this.staticLoadProductDetail);
            console.log(_this.staticProductDetail);
            var l = _this.staticProductDetail.length;
            if (l < 20)
                _this.show = false;
            else
                _this.show = true;
            console.log(l, _this.show);
            for (var i = 0; i < l; i++) {
                if (_this.staticProductDetail[i].profile_photo == null)
                    _this.staticProductDetail[i].profile_photo = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';
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
            _this.load_more = false;
            localStorage.setItem('lastClientId', _this.staticProductDetail[l - 1].id);
            _this.router.navigate(['/clients']);
        });
    };
    ClientsComponent.prototype.myFunction = function () {
        var x = document.getElementById("myDropdown");
        if (x.style.display === 'block') {
            x.style.display = 'none';
        }
        else {
            x.style.display = 'block';
        }
    };
    ClientsComponent.prototype.hide = function () {
        var x = document.getElementById("myDropdown");
        x.style.display = "none";
    };
    ClientsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-clients',
            templateUrl: './clients.component.html',
            styleUrls: ['./clients.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
    ], ClientsComponent);
    return ClientsComponent;
}());
export { ClientsComponent };
//# sourceMappingURL=clients.component.js.map