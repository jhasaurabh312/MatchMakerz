import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientfiveComponent } from './edit-clientfive.component';

describe('EditClientfiveComponent', () => {
  let component: EditClientfiveComponent;
  let fixture: ComponentFixture<EditClientfiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientfiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
