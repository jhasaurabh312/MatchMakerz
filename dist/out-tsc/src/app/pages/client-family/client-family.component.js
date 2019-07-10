import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SnackService } from '../../shared/services/snack.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
var ClientFamilyComponent = /** @class */ (function () {
    function ClientFamilyComponent(_formBuilder, http, router, snack) {
        this._formBuilder = _formBuilder;
        this.http = http;
        this.router = router;
        this.snack = snack;
        this.user = [];
        this.AddClientEducationalDetails = this._formBuilder.group({
            'family_type': [localStorage.getItem('edit_client_family_type')],
            'hometown': [localStorage.getItem('edit_client_hometown')],
            'home_address': [localStorage.getItem('edit_client_home_address')],
            'house_type': [localStorage.getItem('edit_client_house_type')],
            'gotra': [localStorage.getItem('edit_client_gotra')],
            'mother_status': [localStorage.getItem('edit_client_mother_status')],
            'mother_occupation': [localStorage.getItem('edit_client_mother_occupation')],
            'father_status': [localStorage.getItem('edit_client_father_status')],
            'father_occupation': [localStorage.getItem('edit_client_want_father_occupation')],
            'family_income': [localStorage.getItem('edit_client_family_income')],
            'landline': ['na'],
            'married_son': [localStorage.getItem('edit_client_married_son')],
            'unmarried_son': [localStorage.getItem('edit_client_unmarried_son')],
            'married_daughter': [localStorage.getItem('edit_client_married_daughter')],
            'unmarried_daughter': [localStorage.getItem('edit_client_unmarried_daughter')],
            'matchmaker_note': [localStorage.getItem('edit_client_matchmaker_note')],
            'is_active': ['1'],
        });
        ;
    }
    ClientFamilyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        if (localStorage.getItem('clientId')) {
            this.http.get('http://matchmakerz.in/api/v1/client/profile?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (user) {
                _this.user = user;
                console.log(_this.user);
                localStorage.setItem('newClientId', localStorage.getItem('clientId'));
                // localStorage.removeItem('clientId')
                localStorage.setItem('edit_client_family_type', _this.user.family_type);
                localStorage.setItem('edit_client_hometown', _this.user.hometown);
                localStorage.setItem('edit_client_home_address', _this.user.home_address);
                localStorage.setItem('edit_client_house_type', _this.user.house_type);
                localStorage.setItem('edit_client_gotra', _this.user.gotra);
                localStorage.setItem('edit_client_mother_status', _this.user.mother_status);
                localStorage.setItem('edit_client_mother_occupation', _this.user.mother_occupation);
                localStorage.setItem('edit_client_father_status', _this.user.father_status);
                localStorage.setItem('edit_client_want_father_occupation', _this.user.father_occupation);
                localStorage.setItem('edit_client_family_income', _this.user.family_income);
                localStorage.setItem('edit_client_landline', _this.user.landline);
                localStorage.setItem('edit_client_married_son', _this.user.married_son);
                localStorage.setItem('edit_client_unmarried_son', _this.user.unmarried_son);
                localStorage.setItem('edit_client_married_daughter', _this.user.married_daughter);
                localStorage.setItem('edit_client_unmarried_daughter', _this.user.unmarried_daughter);
                localStorage.setItem('edit_client_matchmaker_note', _this.user.matchmaker_note);
                localStorage.setItem('edit_client_is_active', _this.user.is_active);
                _this.AddClientEducationalDetails = _this._formBuilder.group({
                    'family_type': [localStorage.getItem('edit_client_family_type')],
                    'hometown': [localStorage.getItem('edit_client_hometown')],
                    'home_address': [localStorage.getItem('edit_client_home_address')],
                    'house_type': [localStorage.getItem('edit_client_house_type')],
                    'gotra': [localStorage.getItem('edit_client_gotra')],
                    'mother_status': [localStorage.getItem('edit_client_mother_status')],
                    'mother_occupation': [localStorage.getItem('edit_client_mother_occupation')],
                    'father_status': [localStorage.getItem('edit_client_father_status')],
                    'father_occupation': [localStorage.getItem('edit_client_want_father_occupation')],
                    'family_income': [localStorage.getItem('edit_client_family_income')],
                    'landline': ['na'],
                    'married_son': [localStorage.getItem('edit_client_married_son')],
                    'unmarried_son': [localStorage.getItem('edit_client_unmarried_son')],
                    'married_daughter': [localStorage.getItem('edit_client_married_daughter')],
                    'unmarried_daughter': [localStorage.getItem('edit_client_unmarried_daughter')],
                    'matchmaker_note': [localStorage.getItem('edit_client_matchmaker_note')],
                    'is_active': ['1'],
                });
                ;
            });
        }
    };
    ClientFamilyComponent.prototype.addClient = function () {
        var _this = this;
        var NewProfile = new FormData();
        NewProfile.append('id', localStorage.getItem('newClientId'));
        NewProfile.append('family_type', this.AddClientEducationalDetails.value.family_type);
        NewProfile.append('hometown', this.AddClientEducationalDetails.value.hometown);
        NewProfile.append('home_address', this.AddClientEducationalDetails.value.home_address);
        NewProfile.append('house_type', this.AddClientEducationalDetails.value.house_type);
        NewProfile.append('gotra', this.AddClientEducationalDetails.value.gotra);
        NewProfile.append('mother_status', this.AddClientEducationalDetails.value.mother_status);
        NewProfile.append('mother_occupation', this.AddClientEducationalDetails.value.mother_occupation);
        NewProfile.append('father_status', this.AddClientEducationalDetails.value.father_status);
        NewProfile.append('father_occupation', this.AddClientEducationalDetails.value.father_occupation);
        NewProfile.append('family_income', this.AddClientEducationalDetails.value.family_income);
        NewProfile.append('landline', this.AddClientEducationalDetails.value.landline);
        NewProfile.append('married_son', this.AddClientEducationalDetails.value.married_son);
        NewProfile.append('unmarried_son', this.AddClientEducationalDetails.value.unmarried_son);
        NewProfile.append('married_daughter', this.AddClientEducationalDetails.value.unmarried_daughter);
        NewProfile.append('unmarried_daughter', this.AddClientEducationalDetails.value.unmarried_daughter);
        NewProfile.append('matchmaker_note', this.AddClientEducationalDetails.value.matchmaker_note);
        NewProfile.append('is_active', "1");
        console.log(NewProfile);
        return this.http.post('http://matchmakerz.in/api/v1/client/client-family-update', NewProfile, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            _this.data = response;
            console.log(_this.data);
            if (_this.data.status === 1)
                _this.router.navigate(['/client-preferences']);
            else {
                _this.snack.openSnackBar("Some Error Occure", 'required filed');
            }
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    ClientFamilyComponent = tslib_1.__decorate([
        Component({
            selector: 'app-client-family',
            templateUrl: './client-family.component.html',
            styleUrls: ['./client-family.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router, SnackService])
    ], ClientFamilyComponent);
    return ClientFamilyComponent;
}());
export { ClientFamilyComponent };
//# sourceMappingURL=client-family.component.js.map