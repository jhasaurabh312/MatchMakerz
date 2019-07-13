import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
var ClientProfileComponent = /** @class */ (function () {
    function ClientProfileComponent(http, router, modalService) {
        this.http = http;
        this.router = router;
        this.modalService = modalService;
        this.User = [];
        this.user = [];
        this.pref_caste = '';
        this.see_more = false;
    }
    ClientProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.personal = true;
        this.social = false;
        this.preferences = false;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/profile?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (res) {
            _this.user = res;
            if (_this.user.profile_photo === null) {
                if (_this.user.gender === 0) {
                    _this.user.profile_photo = 'http://www.epsomps.vic.edu.au/wp-content/uploads/2016/09/512x512-300x300.png';
                }
                else {
                    _this.user.profile_photo = 'http://www.pranawellness.in/Images/female.png';
                }
            }
            if (_this.user.yearly_income !== null) {
                _this.user.yearly_income = _this.user.yearly_income / 100000;
            }
            console.log(_this.user);
            console.log(_this.user.marital_status == '0');
            console.log(_this.user.marital_status == 0);
            console.log(_this.user.marital_status === 0);
            console.log(_this.user.marital_status === '0');
            if (_this.user.marital_status === '0')
                _this.user.marital = "Not Married";
            else if (_this.user.marital_status === '1')
                _this.user.marital = "Divorced";
            else if (_this.user.marital_status === '2')
                _this.user.marital = "Widowed";
            else
                // if(this.user.marital === 2)
                _this.user.marital = "-";
            if (_this.user.manglik === 0)
                _this.user.manglik = 'Non-Manglik';
            else if (_this.user.manglik === 1)
                _this.user.manglik = 'Manglik';
            else if (_this.user.manglik === 2)
                _this.user.manglik = 'Anshik Manglik';
            else
                _this.user.manglik = '-';
            if (_this.user.religion === 0)
                _this.user.religion = 'Hindu';
            else if (_this.user.religion === 1)
                _this.user.religion = 'Muslim';
            else if (_this.user.religion === 2)
                _this.user.religion = 'Christian';
            else if (_this.user.religion === 3)
                _this.user.religion = 'Sikh';
            else if (_this.user.religion === 4)
                _this.user.religion = 'Jain';
            else
                _this.user.religion = 'Other';
            if (_this.user.occupation == 0)
                _this.user.occupation = 'Not Working';
            else if (_this.user.occupation == 1)
                _this.user.occupation = 'Private Job';
            else if (_this.user.occupation == 2)
                _this.user.occupation = 'Self Employed';
            else if (_this.user.occupation == 3)
                _this.user.occupation = 'Government Job';
            else if (_this.user.occupation == 4)
                _this.user.occupation = 'Doctor';
            else if (_this.user.occupation == 5)
                _this.user.occupation = 'Teacher';
            else
                _this.user.occupation = '-';
            if (_this.user.food_choice === 0)
                _this.user.food_choice = 'Vegetarian';
            else if (_this.user.food_choice === 1)
                _this.user.food_choice = 'Non Vegetarian';
            else
                _this.user.food_choice = '-';
            _this.user.inches = _this.user.height % 12;
            _this.user.feet = (_this.user.height - _this.user.inches) / 12;
            if (_this.user.occupation == 0)
                _this.user.occupation = 'Not Working';
            else if (_this.user.occupation == 1)
                _this.user.occupation = 'Private Company';
            else if (_this.user.occupation == 2)
                _this.user.occupation = 'Self Employed';
            else if (_this.user.occupation == 3)
                _this.user.occupation = 'Government Job';
            else if (_this.user.occupation === 4)
                _this.user.occupation = 'Doctor';
            else if (_this.user.occupation == 5)
                _this.user.occupation = 'Teacher';
            else
                _this.user.occupation = '-';
            if (_this.user.father_status === 0)
                _this.user.father_status = 'Alive';
            else if (_this.user.mother_status === 1)
                _this.user.mother_status = 'Dead';
            else
                _this.user.mother_status = '-';
            if (_this.user.mother_status === 0)
                _this.user.mother_status = 'Alive';
            else if (_this.user.mother_status === 1)
                _this.user.mother_status = 'Dead';
            else
                _this.user.mother_status = '-';
            if (_this.user.father_occupation == 0)
                _this.user.father_occupation = 'Not Working';
            else if (_this.user.father_occupation == 1)
                _this.user.father_occupation = 'Private Company';
            else if (_this.user.father_occupation == 2)
                _this.user.father_occupation = 'Self Employed';
            else if (_this.user.father_occupation == 3)
                _this.user.father_occupation = 'Government Job';
            else if (_this.user.father_occupation == 4)
                _this.user.father_occupation = 'Doctor';
            else if (_this.user.occupation == 5)
                _this.user.occupation = 'Teacher';
            else
                _this.user.occupation = '-';
            if (_this.user.mother_occupation == 0)
                _this.user.mother_occupation = 'Not Working';
            else if (_this.user.mother_occupation == 1)
                _this.user.mother_occupation = 'Private Company';
            else if (_this.user.mother_occupation == 2)
                _this.user.mother_occupation = 'Self Employed';
            else if (_this.user.mother_occupation == 3)
                _this.user.mother_occupation = 'Government Job';
            else if (_this.user.mother_occupation == 4)
                _this.user.mother_occupation = 'Doctor';
            else if (_this.user.occupation == 5)
                _this.user.occupation = 'Teacher';
            else
                _this.user.occupation = '-';
            if (_this.user.is_active === "true")
                _this.user.is_active = 1;
            else
                _this.user.is_active = 0;
            console.log(_this.user);
        });
        this.http.get('http://matchmakerz.in/api/v1/client/client-preferences?id=' + localStorage.getItem('clientId'), { headers: headers }).subscribe(function (res) {
            _this.User = res;
            console.log(_this.User);
            console.log(_this.pref_caste);
            if (_this.User.caste.length > 2) {
                _this.pref_caste = _this.User.caste[0].caste + ", " + _this.User.caste[1].caste;
                _this.see_more = true;
                console.log(_this.pref_caste);
            }
            else {
                for (var i = 0; i < _this.User.caste.length; i++) {
                    _this.pref_caste += _this.User.caste[i].caste + ', ';
                }
                console.log(_this.pref_caste);
            }
            if (_this.User.marital_status === 0)
                _this.User.marital = "Not Married";
            else if (_this.User.marital_status === 1)
                _this.User.marital = "Divorced";
            else if (_this.User.marital_status === 2)
                _this.User.marital = "Widowed";
            else
                _this.User.marital = "-";
            if (_this.User.manglik === 0)
                _this.User.manglik = 'Non-Manglik';
            else if (_this.User.manglik === 1)
                _this.User.manglik = 'Manglik';
            else if (_this.User.manglik === 2)
                _this.User.manglik = 'Anshik Manglik';
            else
                _this.User.manglik = '-';
            if (_this.User.occupation === 0)
                _this.User.occupation = 'Not Working';
            else if (_this.User.occupation === 1)
                _this.User.occupation = 'Private Job';
            else if (_this.User.occupation === 2)
                _this.User.occupation = 'Self Employed';
            else if (_this.User.occupation === 3)
                _this.User.occupation = 'Government Job';
            else if (_this.User.occupation === 4)
                _this.User.occupation = 'Doctor';
            else if (_this.user.occupation === 5)
                _this.user.occupation = 'Teacher';
            else
                _this.user.occupation = '-';
            if (_this.User.food_choice === 0)
                _this.User.food_choice = 'Vegetarian';
            else if (_this.User.food_choice === 1)
                _this.User.food_choice = 'Non Vegetarian';
            else
                _this.User.food_choice = '-';
            _this.User.min_inches = _this.User.min_height % 12;
            _this.User.min_feet = parseInt((_this.User.min_height / 12).toString());
            _this.User.max_inches = _this.User.max_height % 12;
            //  console.log(this.User.max_inches)
            _this.User.max_feet = parseInt(((_this.User.max_height) / 12).toString());
            if (_this.User.citizenship === 0)
                _this.User.citizenship = 'Indian';
            else if (_this.User.citizenship === 1)
                _this.User.citizenship = 'NRI';
            else
                _this.User.citizenship = '-';
            if (_this.User.min_age === null)
                _this.User.min_age = 'na';
            else {
                _this.User.min_age = 2019 - (_this.User.min_age).split('-')[0];
            }
            if (_this.User.max_age === null)
                _this.User.max_age = 'na';
            else {
                _this.User.max_age = 2019 - (_this.User.max_age).split('-')[0];
            }
        });
    };
    ClientProfileComponent.prototype.ShowData = function (e) {
        if (e === 'personal') {
            this.personal = true;
            this.social = false;
            this.preferences = false;
            window.scrollTo(0, 400);
        }
        else if (e == 'social') {
            this.personal = false;
            this.social = true;
            this.preferences = false;
            window.scrollTo(0, 1200);
        }
        else {
            this.personal = false;
            this.social = false;
            this.preferences = true;
            window.scrollTo(0, 2140);
        }
    };
    ClientProfileComponent.prototype.processfile = function (event) {
        var _this = this;
        // const image = event.target.files[0] ;
        this.selectedFile = (event.target.files[0]);
        var uploadData = new FormData();
        console.log(this.selectedFile);
        this.user.profile_pic = URL.createObjectURL(this.selectedFile);
        uploadData.append('profile_pic', this.selectedFile, this.selectedFile.name);
        console.log(this.user.profile_pic);
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
    ClientProfileComponent.prototype.delete = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        this.http.get('http://matchmakerz.in/api/v1/client/deleteClient?id=' + localStorage.getItem('clientId') + '&is_active=' + this.user.is_active, { headers: headers }).subscribe(function (res) {
            _this.user = res;
            console.log(_this.user);
        });
    };
    ClientProfileComponent.prototype.editprofile = function (data1) {
        localStorage.setItem('clientId', data1);
        this.router.navigate(['/edit-personal']);
    };
    ClientProfileComponent.prototype.editeducation = function (data1) {
        localStorage.setItem('clientId', data1);
        this.router.navigate(['/educational-details']);
    };
    ClientProfileComponent.prototype.editsocial = function (data1) {
        localStorage.setItem('clientId', data1);
        this.router.navigate(['/social-details']);
    };
    ClientProfileComponent.prototype.editfamily = function (data1) {
        localStorage.setItem('clientId', data1);
        this.router.navigate(['/client-family']);
    };
    ClientProfileComponent.prototype.editpreferences = function (data1) {
        localStorage.setItem('clientId', data1);
        this.router.navigate(['/client-preferences']);
    };
    ClientProfileComponent.prototype.open = function (content) {
        this.modalService.open(content);
    };
    ClientProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-client-profile',
            templateUrl: './client-profile.component.html',
            styleUrls: ['./client-profile.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Router, NgbModal])
    ], ClientProfileComponent);
    return ClientProfileComponent;
}());
export { ClientProfileComponent };
//# sourceMappingURL=client-profile.component.js.map