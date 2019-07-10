import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackService } from '../../shared/services/snack.service';
var SocialDetailsComponent = /** @class */ (function () {
    function SocialDetailsComponent(_formBuilder, http, router, snack) {
        this._formBuilder = _formBuilder;
        this.http = http;
        this.router = router;
        this.snack = snack;
        this.user = [];
        this.AddClientEducationalDetails = this._formBuilder.group({
            'marital_status': [localStorage.getItem('edit_client_marital_status')],
            'children': [localStorage.getItem('edit_client_children')],
            'mother_tongue': [localStorage.getItem('edit_client_mother_tongue')],
            'religion': [localStorage.getItem('edit_client_religion')],
            'zodiac': [localStorage.getItem('edit_client_zodiac')],
            'manglik': [localStorage.getItem('edit_client_manglik')],
            'caste': [localStorage.getItem('edit_client_caste')],
            'citizenship': [localStorage.getItem('edit_client_citizenship')],
            'want_horoscope_match': [localStorage.getItem('edit_client_want_horoscope_match')],
        });
        ;
    }
    SocialDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/castes', { headers: headers }).subscribe(function (res) {
            console.log(res);
            _this.castes = res;
        });
        if (localStorage.getItem('clientId')) {
            this.http.get('http://matchmakerz.in/api/v1/client/profile?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (user) {
                _this.user = user;
                console.log(_this.user);
                localStorage.setItem('newClientId', localStorage.getItem('clientId'));
                // localStorage.removeItem('clientId')
                localStorage.setItem('edit_client_marital_status', _this.user.marital_status);
                localStorage.setItem('edit_client_mother_tongue', _this.user.mother_tongue);
                localStorage.setItem('edit_client_children', _this.user.children);
                localStorage.setItem('edit_client_religion', _this.user.religion);
                localStorage.setItem('edit_client_zodiac', _this.user.zodiac);
                localStorage.setItem('edit_client_manglik', _this.user.manglik);
                localStorage.setItem('edit_client_caste', _this.user.caste);
                localStorage.setItem('edit_client_citizenship', _this.user.citizenship);
                localStorage.setItem('edit_client_want_horoscope_match', _this.user.want_horoscope_match);
                _this.AddClientEducationalDetails = _this._formBuilder.group({
                    'marital_status': [localStorage.getItem('edit_client_marital_status')],
                    'children': [localStorage.getItem('edit_client_children')],
                    'mother_tongue': [localStorage.getItem('edit_client_mother_tongue')],
                    'religion': [localStorage.getItem('edit_client_religion')],
                    'zodiac': [localStorage.getItem('edit_client_zodiac')],
                    'manglik': [localStorage.getItem('edit_client_manglik')],
                    'caste': [localStorage.getItem('edit_client_caste')],
                    'citizenship': [localStorage.getItem('edit_client_citizenship')],
                    'want_horoscope_match': [localStorage.getItem('edit_client_want_horoscope_match')],
                });
                ;
                // localStorage.setItem('edit_client_birth_place',this.user.birth_place);
                // localStorage.setItem('edit_client_food_choice',this.user.food_choice);
                // localStorage.setItem('edit_client_disability',this.user.disability);
                // localStorage.setItem('edit_client_disabled_part',this.user.disabled_part);
            });
        }
    };
    SocialDetailsComponent.prototype.addClient = function () {
        var _this = this;
        var NewProfile = new FormData();
        NewProfile.append('id', localStorage.getItem('newClientId'));
        NewProfile.append('marital_status', this.AddClientEducationalDetails.value.marital_status);
        NewProfile.append('children', this.AddClientEducationalDetails.value.children);
        NewProfile.append('mother_tongue', this.AddClientEducationalDetails.value.mother_tongue);
        NewProfile.append('religion', this.AddClientEducationalDetails.value.religion);
        NewProfile.append('zodiac', this.AddClientEducationalDetails.value.zodiac);
        NewProfile.append('manglik', this.AddClientEducationalDetails.value.manglik);
        NewProfile.append('caste', this.AddClientEducationalDetails.value.caste);
        NewProfile.append('citizenship', this.AddClientEducationalDetails.value.citizenship);
        NewProfile.append('want_horoscope_match', this.AddClientEducationalDetails.value.want_horoscope_match);
        console.log(NewProfile);
        return this.http.post('http://matchmakerz.in/api/v1/client/client-social-update', NewProfile, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            _this.data = response;
            console.log(_this.data);
            if (_this.data.status === 1)
                _this.router.navigate(['/client-family']);
            else {
                _this.snack.openSnackBar("Some Error Occure", 'required filed');
            }
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    SocialDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-social-details',
            templateUrl: './social-details.component.html',
            styleUrls: ['./social-details.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router, SnackService])
    ], SocialDetailsComponent);
    return SocialDetailsComponent;
}());
export { SocialDetailsComponent };
//# sourceMappingURL=social-details.component.js.map