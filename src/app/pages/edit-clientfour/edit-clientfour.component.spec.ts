import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientfourComponent } from './edit-clientfour.component';

describe('EditClientfourComponent', () => {
  let component: EditClientfourComponent;
  let fixture: ComponentFixture<EditClientfourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientfourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
