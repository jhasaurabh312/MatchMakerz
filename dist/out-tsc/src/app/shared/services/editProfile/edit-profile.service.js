import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var EditProfileService = /** @class */ (function () {
    function EditProfileService(http) {
        this.http = http;
    }
    EditProfileService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], EditProfileService);
    return EditProfileService;
}());
export { EditProfileService };
//# sourceMappingURL=edit-profile.service.js.map