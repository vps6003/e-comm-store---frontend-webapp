import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInput,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    CommonModule
    ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductForm {
  isEdit = false
  formbuilder = inject(FormBuilder);
  productForm = this.formbuilder.group({
    name : [null,[Validators.required,Validators.minLength(5)]],
    shotDescription :[null,[Validators.required,Validators.minLength(10)]],
    description :[null,[Validators.required,Validators.minLength(50)]],
    price : [null,[Validators.required,Validators.min(0)]],
    discount :[],
    images :this.formbuilder.array([]),
    categoryId : [null,[Validators.required]],
  });

    addProduct = () =>{
    // alert('Product Added Successfully');
    console.log(this.productForm.value);
  }

  ngOnInit() {
    this.addImage(null);
  }

addImage = (img?:any) => {
  // alert ('Image Added Successfully');
  this.images.push(this.formbuilder.control(img || null, Validators.required));
}

removeImage = () => {
  // alert ('Image Removed Successfully');
  this.images.removeAt(this.images.length - 1);
}



  get images (){
    return this.productForm.get('images') as FormArray
  }

}
