import { CommonVariablesService } from './../../../services/common-variables-service';
import { Router, NavigationStart, Event as RouterEvent, ActivatedRoute, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component, inject, OnInit } from '@angular/core';
import { CustomerServices } from '../../../services/customer/customer-services';
import { Product } from '../../../types/product';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProductCard } from '../../product-card/product-card';
import { Category } from '../../../types/category';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { NgClass } from '@angular/common';
import { CommonServices } from '../../../services/common-services';

@Component({
  selector: 'app-product-details-page',
  imports: [RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ProductCard,
    MatRadioModule,
    NgClass
  ],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss'
})
export class ProductDetailsPage {

  constructor(private customerServices : CustomerServices ){}

  router = inject(Router);
  route = inject(ActivatedRoute);
  commonServices = inject(CommonServices);
  commonVariablesService = inject(CommonVariablesService);

 product:any;
 productId: string ="";
 previousUrl:string ="";
 currentUrl :string = "";
 selectedImage :any;
 similarProducts:Product[]=[];
 reqParams ={
    categoryId : "",
    brandId : ""
  };
reviewRating :number = 0;

ngOnInit() {
  this.route.paramMap.subscribe((params:any)=>{
    this.getRouterParams();
    this.getProductDetails();
    this.reviewRating = 0;
  })
}

getRouterParams(){
  this.productId = this.route.snapshot.params['id']
}

getProductDetails(){
  this.customerServices.getProductById(this.productId).subscribe((result : Product[])=>{
    this.product = result;
    this.selectImage(this.product.images[0]);
    this.reqParams.categoryId = this.product?.categoryId;
    this.reqParams.brandId = this.product?.brandId;
    this.getSimilarProducts();

    })
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  addReview(req:any){
    if(!req) {
      alert("Please write review then post it!");
      return;
    }
    if(this.reviewRating == 0) {
      alert("Please provide rating before adding review");
      return;
    }
    let reviews = this.product.reviews;
    const user =(localStorage.getItem('user'));
    const userData = JSON.parse(user || "");
    let reviewObj = {userId : "",userName :"", rating : this.reviewRating , comment : req};
    // this.product.reviews.push(reviewObj);
    reviewObj.userId = userData?._id;
    reviewObj.userName = userData?.name;
    reviewObj.rating = this.reviewRating;
    reviewObj.comment = req;
    this.customerServices.addReviews(this.product._id ,reviewObj).subscribe(result =>{
      this.product = result;
    })
  }

  getSimilarProducts(){
    this.customerServices.getSimilarProductsList(this.reqParams).subscribe((result : Product[])=>{
      this.similarProducts = result;
    })
  }

  onInput(event: any) {
  const value = event.target.value;
  const min = 0;
  const max = 5;

  if (value < min) {
    event.target.value = min;
    this.reviewRating = min;
  }
  if (value > max) {
    event.target.value = max;
    this.reviewRating = max;
  }
}

  addToWishlist(productId:string){
    if(this.isInWishlist(productId)) return;
    this.commonServices.addToWishlist(productId);
  }

  removeFromWishList(productId:string){
    if(!this.isInWishlist(productId)) return;
    this.commonServices.removeFromWishList(productId);

  }

  isInWishlist(productId:string) :boolean{
    const exists = this.commonVariablesService.wishlistArray.find(e => e._id == productId);
    return exists ? true : false;
  }

}
