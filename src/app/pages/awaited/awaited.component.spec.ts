import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitedComponent } from './awaited.component';

describe('AwaitedComponent', () => {
  let component: AwaitedComponent;
  let fixture: ComponentFixture<AwaitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
