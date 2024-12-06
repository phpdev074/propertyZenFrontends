import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAddFloorPlanComponent } from './property-add-floor-plan.component';

describe('PropertyAddFloorPlanComponent', () => {
  let component: PropertyAddFloorPlanComponent;
  let fixture: ComponentFixture<PropertyAddFloorPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyAddFloorPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyAddFloorPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
