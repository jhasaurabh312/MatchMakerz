import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackService } from '../../shared/services/snack.service';
var EducationalDetailsComponent = /** @class */ (function () {
    function EducationalDetailsComponent(_formBuilder, http, router, snack) {
        this._formBuilder = _formBuilder;
        this.http = http;
        this.router = router;
        this.snack = snack;
        this.AddClientEducationalDetails = this._formBuilder.group({
            'is_working': [localStorage.getItem('edit_client_is_working')],
            'education': ['NA'],
            'degree': [localStorage.getItem('edit_client_degree')],
            'college': [localStorage.getItem('edit_client_college')],
            'occupation': [localStorage.getItem('edit_client_occupation')],
            'sub_occupation': [localStorage.getItem('edit_client_sub_occupation')],
            'office_address': [localStorage.getItem('edit_client_office_address')],
            'yearly_income': [localStorage.getItem('edit_client_yearly_income')],
        });
        ;
    }
    EducationalDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        // if(localStorage.getItem('clientId')){
        this.http.get('http://matchmakerz.in/api/v1/client/degree', { headers: headers }).subscribe(function (res) {
            console.log(res);
            _this.degree = res;
        });
        this.http.get('http://matchmakerz.in/api/v1/client/profile?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (user) {
            _this.user = user;
            console.log(_this.user);
            localStorage.setItem('newClientId', localStorage.getItem('clientId'));
            // localStorage.removeItem('clientId')
            localStorage.setItem('edit_client_is_working', _this.user.is_working);
            localStorage.setItem('edit_client_degree', _this.user.degree);
            localStorage.setItem('edit_client_college', _this.user.college);
            localStorage.setItem('edit_client_occupation', _this.user.occupation);
            localStorage.setItem('edit_client_sub_occupation', _this.user.sub_occupation);
            localStorage.setItem('edit_client_office_address', _this.user.office_address);
            localStorage.setItem('edit_client_yearly_income', _this.user.yearly_income);
            _this.AddClientEducationalDetails = _this._formBuilder.group({
                'is_working': [localStorage.getItem('edit_client_is_working')],
                'education': ['NA'],
                'degree': [localStorage.getItem('edit_client_degree')],
                'college': [localStorage.getItem('edit_client_college')],
                'occupation': [localStorage.getItem('edit_client_occupation')],
                'sub_occupation': [localStorage.getItem('edit_client_sub_occupation')],
                'office_address': [localStorage.getItem('edit_client_office_address')],
                'yearly_income': [localStorage.getItem('edit_client_yearly_income')],
            });
            ;
        });
        // }
    };
    EducationalDetailsComponent.prototype.addClient = function () {
        var _this = this;
        var NewProfile = new FormData();
        NewProfile.append('id', localStorage.getItem('newClientId'));
        NewProfile.append('is_working', this.AddClientEducationalDetails.value.is_working);
        NewProfile.append('degree', this.AddClientEducationalDetails.value.degree);
        NewProfile.append('college', this.AddClientEducationalDetails.value.college);
        NewProfile.append('occupation', this.AddClientEducationalDetails.value.occupation);
        NewProfile.append('sub_occupation', this.AddClientEducationalDetails.value.sub_occupation);
        NewProfile.append('office_address', this.AddClientEducationalDetails.value.office_address);
        NewProfile.append('yearly_income', this.AddClientEducationalDetails.value.yearly_income);
        NewProfile.append('education', 'NA');
        console.log(localStorage.getItem('newClientId'));
        console.log(this.AddClientEducationalDetails.value);
        return this.http.post('http://localhost:8000/api/v1/client/client-career-update', NewProfile, {
            headers: new HttpHeaders({
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            _this.data = response;
            console.log(_this.data);
            if (_this.data.status === 1)
                _this.router.navigate(['/social-details']);
            else {
                _this.snack.openSnackBar("Some Error Occure", 'required filed');
            }
        }), function (err) {
            console.log('Something went wrong please try again after Sometime', 'danger', 'top-right');
        };
    };
    EducationalDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-educational-details',
            templateUrl: './educational-details.component.html',
            styleUrls: ['./educational-details.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, Router, SnackService])
    ], EducationalDetailsComponent);
    return EducationalDetailsComponent;
}());
export { EducationalDetailsComponent };
//# sourceMappingURL=educational-details.component.js.map