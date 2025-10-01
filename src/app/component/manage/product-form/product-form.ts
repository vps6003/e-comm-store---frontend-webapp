
import { ProductService } from './../../../services/product';
import { CategoryService } from './../../../services/category';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatFormFieldControlHarness } from '@angular/material/form-field/testing';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../../types/category';
import { Brand } from '../../../types/brand';
import { BrandService } from '../../../services/brand';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInput,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
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
  constructor(private categoryService: CategoryService,
     private productService: ProductService,
     private brandService:BrandService,
     private route: ActivatedRoute
  ){}

  router = inject(Router);
  id:String= "";
  isEdit = false;
  allBrands:Brand[]=[];
  allCategories:Category[]=[];
  formbuilder = inject(FormBuilder);
  productForm = this.formbuilder.group({
    productName : [null,[Validators.required,Validators.minLength(5),Validators.maxLength(15)]],
    shotDescription :[null,[Validators.required,Validators.minLength(10)]],
    description :[null,[Validators.required,Validators.minLength(50)]],
    price : [null,[Validators.required,Validators.min(0)]],
    discount :[],
    images :this.formbuilder.array([]),
    categoryId : [null,[Validators.required]],
    brandId : [null,[Validators.required]],
    isFeatured:[false],
    isNewArrival:[false],
    isBestSeller:[false],
    stock:[0],
  });


  ngOnInit() {
    this.addImage(null);
    this.getCategories();
    this.getBrands();
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.isEdit = true;
      this.getProductById();
    }

  }

      updateProduct() {
      if (!this.id) return;
      this.productService.updateProductById(this.id, this.productForm.value).subscribe((result: any) => {
        debugger;
        this.router.navigateByUrl("/admin/product");
      });
    }


    getProductById(){
         this.productService.getProductById(this.id).subscribe((res:any)=>{
        this.productForm.patchValue(res);
        this.images.clear();
        res.images.forEach((img:string) => {
          this.addImage(img);
        });
      });
    }

    addNewProduct(){
    this.productService.addProduct(this.productForm.value).subscribe((result:any)=>{
      // alert("Product added : "+result.productName);
      debugger;
      this.router.navigateByUrl("/admin/product");

    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((res:any)=>{
      this.allCategories=res;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe((res:any)=>{
      this.allBrands=res;
    });
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
