import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-property-add-floor-plan',
  templateUrl: './property-add-floor-plan.component.html',
  styleUrls: ['./property-add-floor-plan.component.scss'],
})
export class PropertyAddFloorPlanComponent implements OnInit {
  propertyData: any;
  floorData: FormGroup | any;
  public loading: boolean = false;
  public submitted: boolean = false;

  constructor(
  private el: ElementRef,
  public router: Router,
  public service: GlobalService,
  private fb: FormBuilder
  ) {}

    
ngOnInit(): void {
  this.floorData = this.fb.group({
    floorplan: ['', [Validators.required, Validators.min(1)]], // Optional
    floorplans: this.fb.array([]), // Initialize FormArray
  });
}

get f() {
  return this.floorData.controls;
}

get floorplans() {
  return this.f.floorplans as FormArray;
}

handleClick(incrementBy: number): void {
  const currentFloorplanCount = this.floorData.get('floorplan')?.value || 0;

  // Increment floorplan count by the passed increment value
  const newFloorplanCount = currentFloorplanCount + incrementBy;

  // Update the floorplan input field
  this.floorData.get('floorplan')?.setValue(newFloorplanCount);

  // Add the required number of floorplans to the FormArray
  this.updateFloorplans(newFloorplanCount);
}

private updateFloorplans(count: number): void {
  const currentCount = this.floorplans.length;

  // Add new floorplan fields if count is greater than the current count
  if (count > currentCount) {
    for (let i = currentCount; i < count; i++) {
      this.floorplans.push(this.fb.group({
        name: ['', Validators.required]  // Add name control for each floorplan
      }));
    }
  } 
  // Remove extra floorplan fields if count is less than current count
  else if (count < currentCount) {
    for (let i = currentCount - 1; i >= count; i--) {
      this.floorplans.removeAt(i);
    }
  }
}

onSubmit(): void {
  this.submitted = true;

  if (this.floorData.invalid) {
    return;
  }

  console.log(this.floorData.value);
}
}
