import { async, TestBed } from '@angular/core/testing';
import { ClientPreferencesComponent } from './client-preferences.component';
describe('ClientPreferencesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ClientPreferencesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ClientPreferencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=client-preferences.component.spec.js.map