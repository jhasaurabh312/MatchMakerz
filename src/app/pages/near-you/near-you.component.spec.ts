import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearYouComponent } from './near-you.component';

describe('NearYouComponent', () => {
  let component: NearYouComponent;
  let fixture: ComponentFixture<NearYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
