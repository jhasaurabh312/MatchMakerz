import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var MyprofileService = /** @class */ (function () {
    function MyprofileService(http) {
        this.http = http;
    }
    MyprofileService.prototype.view_profile = function () {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token')
        });
        return this.http.get('http://matchmakerz.in/api/v1/matchmaker/profile', { headers: headers });
    };
    MyprofileService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], MyprofileService);
    return MyprofileService;
}());
export { MyprofileService };
// signout(event){
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'Token ' + localStorage.getItem('token')
//   })
//   return this.http.get('http://matchmakerz.in/api/v1/matchmaker/logout', { headers: headers }).subscribe((response) => {
//     this.response = response;
//     if(this.response.status === 1){
//       localStorage.setItem('is_active','false');
//       window.location.replace('/');   
//     }   
//     else 
//      console.log('Something went wrong'); 
//   })  
// }
//# sourceMappingURL=myprofile.service.js.map