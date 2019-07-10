import { TestBed } from '@angular/core/testing';
import { MyprofileService } from './myprofile.service';
describe('MyprofileService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MyprofileService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=myprofile.service.spec.js.map