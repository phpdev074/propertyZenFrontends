import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-tenant-add-edit',
  templateUrl: './tenant-add-edit.component.html',
  styleUrls: ['./tenant-add-edit.component.scss'],
})
export class TenantAddEditComponent implements OnInit {
  public loading: boolean = false;
  public submitted: boolean = false;
  public currentdetail: any = {};
  public currentUrl: any = this.router.url;

  tenantData = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    unitNumber:new FormControl('', Validators.required),
    propertyId: new FormControl('', Validators.required), 
  });
  propertyListing: any;

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
        role: 'User'
      }

      const url = '/auth/adminVendorTenantSignup';  
      this.loading = true;
  
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
