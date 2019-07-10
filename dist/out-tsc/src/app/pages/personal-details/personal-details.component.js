import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
var PersonalDetailsComponent = /** @class */ (function () {
    function PersonalDetailsComponent(_formBuilder, http, router) {
        this._formBuilder = _formBuilder;
        this.http = http;
        this.router = router;
        this.startDate = new Date(1970, 0, 1);
        this.birth = [];
        this.values = [];
        this.suc = [];
        this.apiKey = 'AIzaSyCoWnTuLuqqx-SLvnv4gH6UHcC_Sr9KysU';
        this.AddClientDetails = this._formBuilder.group({
            'name': [''],
            'gender': [''],
            'whatsapp_number': [''],
            'phone_number': [''],
            'height': [''],
            'birth_date': [''],
            'birth_place': [''],
            'weight': [''],
            'birth_time': [''],
            'current_city': [''],
            'food_choice': [''],
            'disability': [''],
            'disabled_part': [''],
        });
        ;
    }
    PersonalDetailsComponent.prototype.ngOnInit = function () {
    };
    PersonalDetailsComponent.prototype.addClient = function () {
        var _this = this;
        var NewProfile = new FormData();
        NewProfile.append('name', this.AddClientDetails.value.name);
        NewProfile.append('phone_number', this.AddClientDetails.value.phone_number);
        NewProfile.append('gender', this.AddClientDetails.value.gender);
        NewProfile.append('whatsapp_number', this.AddClientDetails.value.whatsapp_number);
        NewProfile.append('height', this.AddClientDetails.value.height);
        // NewProfile.append('birth_date', this.AddClientDetails.value.birth_date );
        NewProfile.append('birth_place', this.AddClientDetails.value.birth_place);
        NewProfile.append('weight', this.AddClientDetails.value.weight);
        NewProfile.append('birth_time', this.AddClientDetails.value.birth_time);
        NewProfile.append('current_city', this.AddClientDetails.value.current_city);
        NewProfile.append('food_choice', this.AddClientDetails.value.food_choice);
        NewProfile.append('disability', this.AddClientDetails.value.disability);
        NewProfile.append('disabled_part', this.AddClientDetails.value.disabled_part);
        // toISOString().slice(0,10)
        var date = new Date(this.AddClientDetails.value.birth_date);
        var dob = date.toISOString().slice(0, 10).toString();
        NewProfile.append('birth_date', dob.toString());
        console.log(NewProfile.get('birth_date'));
        return this.http.post('http://matchmakerz.in/api/v1/client/registerClient', NewProfile, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            console.log(response);
            _this.data = response;
            if (_this.data.status === 1) {
                localStorage.setItem('newClientId', _this.data.id);
                _this.router.navigate(['/educational-details']);
            }
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    PersonalDetailsComponent.prototype.getlocation = function () {
        // const headers = new HttpHeaders({
        //   'Content-Type': 'Application/json',
        var _this = this;
        // })
        this.values = this.AddClientDetails.value.current_city;
        console.log(this.values);
        return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + this.values + '&key=' + this.apiKey).subscribe(function (suc) {
            _this.suc = suc;
            console.log(_this.suc);
        });
    };
    PersonalDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-personal-details',
            templateUrl: './personal-details.component.html',
            styleUrls: ['./personal-details.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router])
    ], PersonalDetailsComponent);
    return PersonalDetailsComponent;
}());
export { PersonalDetailsComponent };
//# sourceMappingURL=personal-details.component.js.map