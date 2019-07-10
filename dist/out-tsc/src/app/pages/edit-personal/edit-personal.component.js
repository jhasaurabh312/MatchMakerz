import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SnackService } from '../../shared/services/snack.service';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
var EditPersonalComponent = /** @class */ (function () {
    function EditPersonalComponent(_formBuilder, http, router, snack) {
        this._formBuilder = _formBuilder;
        this.http = http;
        this.router = router;
        this.snack = snack;
        this.startDate = new Date(1970, 0, 1);
        this.birth = [];
        this.values = [];
        this.suc = [];
        this.apiKey = 'AIzaSyCoWnTuLuqqx-SLvnv4gH6UHcC_Sr9KysU';
        this.user = [];
        this.AddClientDetails = this._formBuilder.group({
            'name': [localStorage.getItem('edit_client_name')],
            'gender': [localStorage.getItem('edit_client_gender')],
            'whatsapp_number': [localStorage.getItem('edit_client_whatsapp_number')],
            'phone_number': [localStorage.getItem('edit_client_phone_number')],
            'height': [localStorage.getItem('edit_client_height')],
            'birth_date': [localStorage.getItem('edit_client_birth_date')],
            'birth_place': [localStorage.getItem('edit_client_birth_place')],
            'weight': [localStorage.getItem('edit_client_weight')],
            'birth_time': [localStorage.getItem('edit_client_birth_time')],
            'current_city': [localStorage.getItem('edit_client_current_city')],
            'food_choice': [localStorage.getItem('edit_client_food_choice')],
            'disability': [localStorage.getItem('edit_client_disability')],
            'disabled_part': [localStorage.getItem('edit_client_disabled_part')],
        });
        ;
    }
    EditPersonalComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        if (localStorage.getItem('clientId')) {
            this.http.get('http://matchmakerz.in/api/v1/client/profile?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (user) {
                _this.user = user;
                console.log(_this.user);
                localStorage.setItem('clientProfileId', localStorage.getItem('clientId'));
                // localStorage.removeItem('clientId')
                localStorage.setItem('edit_client_name', _this.user.name);
                localStorage.setItem('edit_client_phone_number', _this.user.phone_number);
                localStorage.setItem('edit_client_whatsapp_number', _this.user.whatsapp_number);
                localStorage.setItem('edit_client_gender', _this.user.gender);
                localStorage.setItem('edit_client_height', _this.user.height);
                localStorage.setItem('edit_client_birth_date', _this.user.birth_date);
                localStorage.setItem('edit_client_birth_time', _this.user.birth_time);
                localStorage.setItem('edit_client_weight', _this.user.weight);
                localStorage.setItem('edit_client_current_city', _this.user.current_city);
                localStorage.setItem('edit_client_birth_place', _this.user.birth_place);
                localStorage.setItem('edit_client_food_choice', _this.user.food_choice);
                localStorage.setItem('edit_client_disability', _this.user.disability);
                localStorage.setItem('edit_client_disabled_part', _this.user.disabled_part);
                _this.AddClientDetails = _this._formBuilder.group({
                    'name': [localStorage.getItem('edit_client_name')],
                    'gender': [localStorage.getItem('edit_client_gender')],
                    'whatsapp_number': [localStorage.getItem('edit_client_whatsapp_number')],
                    'phone_number': [localStorage.getItem('edit_client_phone_number')],
                    'height': [localStorage.getItem('edit_client_height')],
                    'birth_date': [localStorage.getItem('edit_client_birth_date')],
                    'birth_place': [localStorage.getItem('edit_client_birth_place')],
                    'weight': [localStorage.getItem('edit_client_weight')],
                    'birth_time': [localStorage.getItem('edit_client_birth_time')],
                    'current_city': [localStorage.getItem('edit_client_current_city')],
                    'food_choice': [localStorage.getItem('edit_client_food_choice')],
                    'disability': [localStorage.getItem('edit_client_disability')],
                    'disabled_part': [localStorage.getItem('edit_client_disabled_part')],
                });
                ;
            });
        }
    };
    EditPersonalComponent.prototype.addClient = function () {
        var _this = this;
        var NewProfile = new FormData();
        NewProfile.append('id', localStorage.getItem('clientProfileId'));
        NewProfile.append('name', this.AddClientDetails.value.name);
        NewProfile.append('phone_number', this.AddClientDetails.value.phone_number);
        NewProfile.append('gender', this.AddClientDetails.value.gender);
        NewProfile.append('whatsapp_number', this.AddClientDetails.value.whatsapp_number);
        NewProfile.append('height', this.AddClientDetails.value.height);
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
        return this.http.post('http://matchmakerz.in/api/v1/client/updateclient/', NewProfile, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            console.log(response);
            _this.data = response;
            if (_this.data.status === 1) {
                localStorage.setItem('newClientId', localStorage.getItem('clientProfileId'));
                _this.router.navigate(['/educational-details']);
            }
            else {
                _this.snack.openSnackBar("Some Error Occure", 'required filed');
            }
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    EditPersonalComponent = tslib_1.__decorate([
        Component({
            selector: 'app-edit-personal',
            templateUrl: './edit-personal.component.html',
            styleUrls: ['./edit-personal.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router, SnackService])
    ], EditPersonalComponent);
    return EditPersonalComponent;
}());
export { EditPersonalComponent };
//# sourceMappingURL=edit-personal.component.js.map