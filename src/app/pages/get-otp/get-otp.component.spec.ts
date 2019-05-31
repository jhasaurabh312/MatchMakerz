import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOTPComponent } from './get-otp.component';

describe('GetOTPComponent', () => {
  let component: GetOTPComponent;
  let fixture: ComponentFixture<GetOTPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOTPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
