import { CommonVariablesService } from './../../../services/common-variables-service';
import { Category } from './../../../types/category';
import { Component, inject, SimpleChanges } from '@angular/core';
import { CustomerServices } from '../../../services/customer/customer-services';
import { Product } from '../../../types/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductCard } from '../../product-card/product-card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Brand } from '../../../types/brand';
import { CommonServices } from '../../../services/common-services';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list-page',
  imports: [RouterModule,
    ProductCard,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss'
})
export class ProductListPage {

  constructor(
    private customerServices : CustomerServices,
    private commonServices : CommonServices,
    private commonVariablesService : CommonVariablesService,
  ){}
  router = inject(Router);
  route = inject(ActivatedRoute);
  queryReqParams:any ;
  reqParams ={
    searchTerm : "",
    categoryId : "",
    brandId : "",
    sortBy : "price",
    sortOrder : "1",
    page : 1,
    pageSize : 6
  };
  productList : Product[]=[];
  categoryList : Category[] = [];
  brandsList : Brand[] = [];

  ngOnInit(): void {
    if(!this.route.snapshot.queryParams['searchTerm'] && !this.route.snapshot.queryParams['categoryId'] && !this.route.snapshot.queryParams['brandId']) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.queryReqParams = this.route.queryParams.subscribe((params:any)=>{
       this.reqParams = {
      ...this.reqParams,  // keep defaults
      ...params           // override with actual query params
    };

    this.commonVariablesService.searchTerm = this.reqParams.searchTerm;

      this.getProductLists(this.reqParams);
      this.getBrands();
      this.getCategory();
    });
  }


  getProductLists(params:any){
    setTimeout(()=>{

      this.customerServices.getProductsList(params).subscribe((result) =>{
        this.productList = result;
      });
    },100);

  }

  getCategory(){
    this.customerServices.getCategories().subscribe((result:Category[]) =>{
      this.categoryList = result;
    })
  }

  getBrands(){
    this.customerServices.getBrands().subscribe((result:Brand[]) =>{
      this.brandsList = result;
    })
  }

  pageChange(page:number){
    this.reqParams.page = page;
    this.getProductLists(this.reqParams);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.queryReqParams){
      this.queryReqParams.unsubscribe();
    }
  }


}
