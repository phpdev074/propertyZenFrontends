import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddEditComponent } from './property-add-edit.component';

describe('PropertyAddEditComponent', () => {
  let component: PropertyAddEditComponent;
  let fixture: ComponentFixture<PropertyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
