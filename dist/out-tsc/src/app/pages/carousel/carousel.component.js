import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
var CarouselComponent = /** @class */ (function () {
    // images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
    // showNavigationArrows = false;
    //   showNavigationIndicators = false;
    //   images = [
    //     '../../../assets/icons/Group_1.png',
    //     // '../../../assets/icons/Group_2.png',
    //     // '../../../assets/icons/Group_3.png'
    //   ]
    function CarouselComponent(config, router) {
        this.router = router;
        // customize default values of carousels used by this component tree
        // config.showNavigationArrows = true;
        // config.showNavigationIndicators = true;
    }
    CarouselComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('token') != null)
            this.router.navigate(['/clients']);
        else {
            this.check1 = true;
            this.check2 = false;
            this.check3 = false;
        }
    };
    CarouselComponent.prototype.check = function (data) {
        if (data === 1) {
            this.check1 = false;
            this.check2 = true;
            this.check3 = false;
        }
        if (data === 2) {
            this.check1 = false;
            this.check2 = false;
            this.check3 = true;
        }
        if (data === 3) {
            this.router.navigate(['/get-otp']);
        }
    };
    CarouselComponent = tslib_1.__decorate([
        Component({
            selector: 'app-carousel',
            templateUrl: './carousel.component.html',
            styleUrls: ['./carousel.component.scss'],
            providers: [NgbCarouselConfig]
        }),
        tslib_1.__metadata("design:paramtypes", [NgbCarouselConfig, Router])
    ], CarouselComponent);
    return CarouselComponent;
}());
export { CarouselComponent };
//# sourceMappingURL=carousel.component.js.map