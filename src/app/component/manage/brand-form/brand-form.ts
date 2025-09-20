import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrandService } from '../../../services/brand';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-form',
  imports: [MatInput,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.scss'
})
export class BrandForm {

  brandName!:String;
  router = inject(Router);
  route=inject(ActivatedRoute);
  isEdit = false;
  id!:String
  brandService = new BrandService;
  idParams!:any;

  ngOnInit(){
    this.isEdit= false;
    this.id = this.route.snapshot.params['id'];
    if(this.id)
    {
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe((result:any)=>{
        this.idParams = result;
      })
    }
  }

  update(id:String,brandName:String){
    this.idParams.brandName = brandName
    this.brandService.updateBrandById(id,this.idParams).subscribe((result:any)=>{
      this.idParams = result;
    })
  }

  add(){
    this.brandService.addBrand(this.brandName).subscribe((result:any)=>{
      // alert("Brand added : "+result.brandName);
      this.router.navigateByUrl("/admin/brand");
    })
  }

}
