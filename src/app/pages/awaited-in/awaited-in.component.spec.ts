import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitedInComponent } from './awaited-in.component';

describe('AwaitedInComponent', () => {
  let component: AwaitedInComponent;
  let fixture: ComponentFixture<AwaitedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwaitedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
