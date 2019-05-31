import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitedOutComponent } from './awaited-out.component';

describe('AwaitedOutComponent', () => {
  let component: AwaitedOutComponent;
  let fixture: ComponentFixture<AwaitedOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitedOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
