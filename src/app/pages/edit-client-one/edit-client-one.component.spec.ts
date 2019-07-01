import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientOneComponent } from './edit-client-one.component';

describe('EditClientOneComponent', () => {
  let component: EditClientOneComponent;
  let fixture: ComponentFixture<EditClientOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
