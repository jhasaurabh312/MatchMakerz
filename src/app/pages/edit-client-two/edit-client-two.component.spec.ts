import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientTwoComponent } from './edit-client-two.component';

describe('EditClientTwoComponent', () => {
  let component: EditClientTwoComponent;
  let fixture: ComponentFixture<EditClientTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
