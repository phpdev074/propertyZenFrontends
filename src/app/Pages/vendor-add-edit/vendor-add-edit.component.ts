import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-vendor-add-edit',
  templateUrl: './vendor-add-edit.component.html',
  styleUrls: ['./vendor-add-edit.component.scss']
})
export class VendorAddEditComponent implements OnInit {
  public loading: boolean = false;
  public submitted: boolean = false;
  public currentdetail: any = {};
  public currentUrl: any = this.router.url;
  public propertyListing:any=[];
  public selectedProperty:any={}

  tenantData = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    propertyId: new FormControl('', Validators.required), 
  });

  get fullName(): string {
    return `${this.tenantData.value.firstName} ${this.tenantData.value.lastName}`.trim();
  }

  get f() {
    return this.tenantData.controls;
  }

  constructor(
    private el: ElementRef,
    public router: Router,
    public service: GlobalService
  ) {}

  ngOnInit(): void {
    this.getProperty(1)
  }



  onPropertyChange(event: any): void {
    // Directly set the selected property object from the event value
    // this.selectedProperty = event.target.value;
    // console.log('Selected Property Object:', this.selectedProperty);
    // // this.tenantData = new FormGroup({
    // //   property: new FormControl(this.selectedProperty, Validators.required),
    // // });
  
    // // Optionally, log the data for verification
    // const data = this.propertyListing.find((e: any) => e.id === this.selectedProperty.id);
    // console.log('Selected Property from Listing:', data, '===>>');
  }
  getProperty(page:any){
    this.loading=true;
    var url:any='/property/list';
    
    this.service.GetApi(url).subscribe(((response:any)=>{
      if(response.success ==1) {  
        var self =this; 
        this.propertyListing=response.data
        this.loading=false;
      } else {
        
        this.loading=false;
      }
    }), (error) => { this.loading =false; });
  }


  onSubmit() {
    this.submitted = true;
 

    if (this.tenantData.invalid) {
      return;
    }
  
    let userDetail: any = this.tenantData.value;

    if (this.tenantData.valid) {
      userDetail={
        ...userDetail,
        role: 'Vendor'
      }
      this.loading = true;
      const url = '/auth/adminVendorTenantSignup';  
      this.service.PostApiFormData(userDetail, url).subscribe(
        (response: any) => {
          if (response.success === 1) {
            this.tenantData.reset();
            this.submitted = false;  
            this.loading = false;    
            this.service.back();     
          } else {
            alert(response.message)
            this.service.dangerAlert(response.message);
            this.loading = false;
          }
        },
        (error: any) => {
          console.error('Error:', error);
          this.loading = false;
        }
      );
    }
  }
}
