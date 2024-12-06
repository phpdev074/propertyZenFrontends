import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAddEditComponent } from './building-add-edit.component';

describe('BuildingAddEditComponent', () => {
  let component: BuildingAddEditComponent;
  let fixture: ComponentFixture<BuildingAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
