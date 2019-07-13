import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
var SnackService = /** @class */ (function () {
    function SnackService(_snackBar) {
        this._snackBar = _snackBar;
    }
    SnackService.prototype.openSnackBar = function (message, action) {
        this._snackBar.open(message, action, {
            duration: 3000,
        });
    };
    SnackService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [MatSnackBar])
    ], SnackService);
    return SnackService;
}());
export { SnackService };
//# sourceMappingURL=snack.service.js.map