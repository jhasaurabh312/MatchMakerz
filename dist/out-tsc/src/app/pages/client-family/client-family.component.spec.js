import { async, TestBed } from '@angular/core/testing';
import { ClientFamilyComponent } from './client-family.component';
describe('ClientFamilyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({ declarations: [ClientFamilyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ClientFamilyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=client-family.component.spec.js.map