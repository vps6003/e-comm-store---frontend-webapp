import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-category-form',
  imports: [MatInput,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm {

  name!:String;
  router = inject(Router);
  route=inject(ActivatedRoute);
  isEdit = false;
  id!:String
  categoryService = new CategoryService;
  idParams!:any;

  ngOnInit(){
    this.isEdit= false;
    this.id = this.route.snapshot.params['id'];
    if(this.id)
    {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((result:any)=>{
        this.idParams = result;
      })
    }
  }

  update(id:String,name:String){
    this.idParams.name = name
    this.categoryService.updateCategoryById(id,this.idParams).subscribe((result:any)=>{
      this.idParams = result.result;
    })
  }

  add(){
    this.categoryService.addCategory(this.name).subscribe((result:any)=>{
      alert("Category added : "+result.name);
      this.router.navigateByUrl("/admin/categories");

    })
  }



}
