import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientThreeComponent } from './edit-client-three.component';

describe('EditClientThreeComponent', () => {
  let component: EditClientThreeComponent;
  let fixture: ComponentFixture<EditClientThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
