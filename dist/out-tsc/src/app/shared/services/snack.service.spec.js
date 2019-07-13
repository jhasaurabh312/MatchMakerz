import { TestBed } from '@angular/core/testing';
import { SnackService } from './snack.service';
describe('SnackService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SnackService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=snack.service.spec.js.map