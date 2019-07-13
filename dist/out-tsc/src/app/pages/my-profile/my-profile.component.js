import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyprofileService } from '../../shared/services/myProfile/myprofile.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SnackService } from '../../shared/services/snack.service';
var MyProfileComponent = /** @class */ (function () {
    function MyProfileComponent(http, myProfile, router, snack) {
        this.http = http;
        this.myProfile = myProfile;
        this.router = router;
        this.snack = snack;
        this.user = [];
        this.result = [];
        this.show = false;
        this.clients = !true;
        this.my_profile = !false;
    }
    MyProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/matchmaker/totalclients', { headers: headers }).subscribe(function (result) {
            _this.result = result;
            console.log(_this.result);
        });
        this.myProfile.view_profile().subscribe(function (response) {
            _this.user = response;
            console.log(_this.user);
            localStorage.setItem('signup_first_name', _this.user.first_name);
            localStorage.setItem('signup_last_name', _this.user.last_name);
            localStorage.setItem('signup_age', _this.user.age);
            localStorage.setItem('signup_gender', _this.user.gender);
            localStorage.setItem('signup_email', _this.user.email);
            localStorage.setItem('signup_whatsapp_number', _this.user.whatsapp_number);
            localStorage.setItem('signup_about', _this.user.about);
            localStorage.setItem('signup_phone_number', _this.user.phone_number);
            localStorage.setItem('signup_unique_about', _this.user.unique_about);
            localStorage.setItem('signup_specialization', _this.user.specialization);
            if (_this.user.experience !== null) {
                console.log(_this.user.experience);
                console.log("******");
                localStorage.setItem('signup_experience', _this.user.experience);
            }
            else {
                _this.user.experience = 0;
                console.log(_this.user.experience);
                console.log("******");
                localStorage.setItem('signup_experience', '0');
            }
            console.log(localStorage.getItem('signup_experience'));
            if (_this.user.profile_pic === null)
                _this.user.profile_pic = 'https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png';
        });
    };
    MyProfileComponent.prototype.ActiveBorder = function (e) {
        if (e === 'my_profile') {
            this.my_profile = true;
            this.clients = false;
        }
        else {
            this.my_profile = !true;
            this.clients = !false;
        }
    };
    MyProfileComponent.prototype.toggle = function () {
        this.show = !this.show;
    };
    MyProfileComponent.prototype.signout = function () {
        localStorage.clear();
        this.router.navigate(['/carousel']);
    };
    MyProfileComponent.prototype.editProfile = function () {
        this.router.navigate(['/edit-profile']);
    };
    MyProfileComponent.prototype.myFunction = function () {
        document.getElementById("myDropdown").classList.toggle("show");
    };
    MyProfileComponent.prototype.processfile = function (event) {
        var _this = this;
        // const image = event.target.files[0] ;
        this.selectedFile = (event.target.files[0]);
        var uploadData = new FormData();
        console.log(this.selectedFile);
        uploadData.append('profile_pic', this.selectedFile, this.selectedFile.name);
        // console.log(this.user.profile_pic)
        uploadData.append('matchmaker_id', this.user.id);
        this.http.post('http://matchmakerz.in/api/v1/matchmaker/uploadProfilePic', uploadData, {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        }))
            .subscribe(function (response) {
            _this.response = response;
            console.log(_this.response);
            if (_this.response.status === 1)
                _this.router.navigate(['/my-profile']);
            else
                alert('Cannot Update !! something went Wrong');
        }), function (err) {
            alert('Something went wrong please try again after Sometime');
        };
    };
    MyProfileComponent.prototype.submit = function () {
        var _this = this;
        var NewValue = new FormData();
        NewValue.append('profile_pic', document.getElementById('photo').value);
        this.http.post('http://matchmakerz.in/api/v1/matchmaker/uploadProfilePic', NewValue, {
            headers: new HttpHeaders({
                // 'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token'),
            })
        }).pipe(catchError(function (error) {
            return throwError("oops");
        })).subscribe(function (response) {
            _this.response = response;
            console.log(_this.response);
            if (_this.response.status === 1)
                _this.router.navigate(['/my-profile']);
            else
                alert('Cannot Update !! something went Wrong');
        }), function (err) {
            alert('Something went wrong please try again after Sometime');
        };
        //  console.log((<HTMLInputElement>document.getElementById('photo')).value);
    };
    MyProfileComponent.prototype.viewWebsite = function (id) {
        console.log(id);
        window.open('https://partner.hansmatrimony.com', "_blank");
    };
    MyProfileComponent.prototype.copy = function (id) {
        var inp = document.createElement('input');
        document.body.appendChild(inp);
        inp.value = 'https://partner.hansmatrimony.com';
        inp.select();
        document.execCommand('copy', false);
        inp.remove();
        this.snack.openSnackBar("Successfully copied link", 'success');
    };
    MyProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-my-profile',
            templateUrl: './my-profile.component.html',
            styleUrls: ['./my-profile.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, MyprofileService, Router, SnackService])
    ], MyProfileComponent);
    return MyProfileComponent;
}());
export { MyProfileComponent };
//# sourceMappingURL=my-profile.component.js.map