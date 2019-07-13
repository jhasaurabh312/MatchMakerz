import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EditProfileService } from 'src/app/shared/services/editProfile/edit-profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackService } from '../../shared/services/snack.service';
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(_formBuilder, http, edit, router, snack) {
        this._formBuilder = _formBuilder;
        this.http = http;
        this.edit = edit;
        this.router = router;
        this.snack = snack;
        this.values = '';
        this.results = [];
        this.EditProfileDetails = this._formBuilder.group({
            'first_name': [localStorage.getItem('signup_first_name')],
            'last_name': [localStorage.getItem('signup_last_name')],
            'age': [localStorage.getItem('signup_age')],
            'gender': [localStorage.getItem('signup_gender')],
            'whatsapp_number': [localStorage.getItem('signup_whatsapp_number')],
            'about': [localStorage.getItem('signup_about')],
            'phone_number': [localStorage.getItem('signup_phone_number')],
            'email': [localStorage.getItem('signup_email')],
            'unique_about': [localStorage.getItem('signup_unique_about')],
            'specialization': [localStorage.getItem('signup_specialization')],
            'experience': [localStorage.getItem('signup_experience')],
        });
        ;
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/notifications', { headers: headers }).subscribe(function (response) {
            _this.notices = response.notification;
            console.log(_this.notices);
        });
    };
    EditProfileComponent.prototype.myFunction = function () {
        document.getElementById("myDropdown").classList.toggle("show");
    };
    EditProfileComponent.prototype.editProfile = function () {
        var _this = this;
        var NewProfile = new FormData();
        NewProfile.append('first_name', this.EditProfileDetails.value.first_name);
        NewProfile.append('last_name', this.EditProfileDetails.value.last_name);
        NewProfile.append('phone_number', this.EditProfileDetails.value.phone_number);
        NewProfile.append('email', this.EditProfileDetails.value.email);
        NewProfile.append('about', this.EditProfileDetails.value.about);
        NewProfile.append('unique_about', this.EditProfileDetails.value.unique_about);
        NewProfile.append('specialization', this.EditProfileDetails.value.specialization);
        NewProfile.append('gender', this.EditProfileDetails.value.gender);
        NewProfile.append('age', this.EditProfileDetails.value.age);
        NewProfile.append('experience', this.EditProfileDetails.value.experience);
        NewProfile.append('whatsapp_number', this.EditProfileDetails.value.whatsapp_number);
        console.log(this.EditProfileDetails.value);
        return this.http.post('http://matchmakerz.in/api/v1/matchmaker/profile/', NewProfile, {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            _this.data = response;
            if (_this.data.status === 1) {
                window.alert("Your Profile has been successfully updated !!!");
                _this.router.navigate(['/my-profile']);
            }
            else {
                _this.snack.openSnackBar("Some Error Occure", 'required filed');
            }
        }), function (err) {
            alert('Something went wrong please try again after Sometime');
        };
    };
    EditProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-edit-profile',
            templateUrl: './edit-profile.component.html',
            styleUrls: ['./edit-profile.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient, EditProfileService, Router, SnackService])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
export { EditProfileComponent };
//# sourceMappingURL=edit-profile.component.js.map