import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-property-add-edit',
  templateUrl: './property-add-edit.component.html',
  styleUrls: ['./property-add-edit.component.scss']
})
export class PropertyAddEditComponent implements OnInit {
  public loading: boolean = false;
  public submitted: boolean = false;
  public currentdetail: any = {};
  public currentUrl: any = this.router.url;
  propertyData: FormGroup | any;  
  manaerList :[]| any

  constructor(
    private el: ElementRef,
    public router: Router,
    public service: GlobalService
  ) {}

  ngOnInit(): void {

    this.getManagerList()
    this.propertyData= new FormGroup({
      PropertyName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      managerId: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }


 getManagerList(){
    this.loading=true;
    var url:any='/user/manager-listing';
    this.service.GetApi(url).subscribe(((response:any)=>{
      if(response.success ==1) {  
        this.manaerList=response.data
        this.loading=false;
      } else {
        this.loading=false;
      }
    }), (error) => { this.loading =false; });
  }

  get f() {
    return this.propertyData.controls;
  }

  onSubmit() {
    this.submitted = true;  
    if (this.propertyData.invalid) {
      return;
    }
    const formData = this.propertyData.value;

    console.log(formData,'===>>formData')
    this.router.navigate(['/property-floorPlan'], { state: { propertyData: formData } });
  }

}
