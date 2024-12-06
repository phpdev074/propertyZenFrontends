import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantAddEditComponent } from './tenant-add-edit.component';

describe('TenantAddEditComponent', () => {
  let component: TenantAddEditComponent;
  let fixture: ComponentFixture<TenantAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
