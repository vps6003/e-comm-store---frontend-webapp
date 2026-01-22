import { CommonVariablesService } from './../../../services/common-variables-service';
import {
  Router,
  NavigationStart,
  Event as RouterEvent,
  ActivatedRoute,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CustomerServices } from '../../../services/customer/customer-services';
import { Product } from '../../../types/product';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProductCard } from '../../product-card/product-card';
import { Category } from '../../../types/category';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { NgClass } from '@angular/common';
import { CommonServices } from '../../../services/common-services';
import { ToasterMessageService } from '../../../services/toaster-message-service';

@Component({
  selector: 'app-product-details-page',
  imports: [
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ProductCard,
    MatRadioModule,
    NgClass,
  ],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.scss',
})
export class ProductDetailsPage {
  constructor(private customerServices: CustomerServices) {}

  router = inject(Router);
  route = inject(ActivatedRoute);
  commonServices = inject(CommonServices);
  commonVariablesService = inject(CommonVariablesService);
  toaster = inject(ToasterMessageService);

  product: any;
  productId: string = '';
  previousUrl: string = '';
  currentUrl: string = '';
  selectedImage: any;
  similarProducts: Product[] = [];
  reqParams = {
    categoryId: '',
    brandId: '',
  };
  reviewRating: number = 0;
  itemsPerPage: number = 2;
  totalPages: number = 1;
  currentPage: number = 1;

  ngOnInit() {
    this.route?.paramMap?.subscribe(async (params: any) => {
      this.getRouterParams();
      await this.getProductDetails();
      // this.updateItemsPerPage();
      this.reviewRating = 0;
    });
  }

  getRouterParams() {
    this.productId = this.route.snapshot.params['id'];
  }

  getProductDetails() {
    this.customerServices.getProductById(this.productId).subscribe(async (result: Product[]) => {
      this.product = result;
      this.selectImage(this.product?.images[0]);
      this.reqParams.categoryId = this.product?.categoryId;
      this.reqParams.brandId = this.product?.brandId;
      await this.commonServices.getCustomerCart();
      await this.commonServices.getCustomerWishlist();
      this.getSimilarProducts();
    });
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  addReview(req: any) {
    if (!req) {
      this.toaster.show('Please write review then post it!');
      return;
    }
    if (this.reviewRating == 0) {
      this.toaster.show('Please provide rating before adding review');
      return;
    }
    let reviews = this.product?.reviews;
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user || '');
    let reviewObj = { userId: '', userName: '', rating: this.reviewRating, comment: req };
    // this.product?.reviews.push(reviewObj);
    reviewObj.userId = userData?._id;
    reviewObj.userName = userData?.name;
    reviewObj.rating = this.reviewRating;
    reviewObj.comment = req;
    this.customerServices.addReviews(this.product?._id, reviewObj).subscribe((result) => {
      this.product = result;
    });
  }

  getSimilarProducts() {
    this.customerServices.getSimilarProductsList(this.reqParams).subscribe((result: Product[]) => {
      this.similarProducts = result;
      this.updateItemsPerPage();
    });
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

  addToWishlist(productId: string) {
    if (this.isInWishlist(productId)) return;
    this.commonServices.addToWishlist(productId);
  }

  removeFromWishList(productId: string) {
    if (!this.isInWishlist(productId)) return;
    this.commonServices.removeFromWishList(productId);
  }

  isInWishlist(productId: string): boolean {
    const exists = this.commonVariablesService.wishlistArray.find((e) => e._id == productId);
    return exists ? true : false;
  }

  // From PRoduct Card only addition of 1 item is available to change  quantity need to go to cart page
  addToCart(productId: string) {
    let quantity = 1;
    this.commonServices.addToCart(productId, quantity);
    return;
  }

  removeFromCart(productId: string) {
    if (!this.isInCart(productId)) return;
    this.commonServices.removeFromCart(productId);
  }

  isInCart(productId: string): boolean {
    const exists = this.commonVariablesService.cartData?.productQuantity.find(
      (e: any) => e.productId._id == productId,
    );
    return exists ? true : false;
  }

  // Dynamically adjust items per page based on screen width
  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerPage();
  }

  updateItemsPerPage() {
    const width = window.innerWidth;

    if (width < 640)
      this.itemsPerPage = 1; // mobile
    else if (width < 768)
      this.itemsPerPage = 2; // small tablets
    else if (width < 1024)
      this.itemsPerPage = 3; // tablets
    else if (width < 1200)
      this.itemsPerPage = 4; // landscape tablets
    else this.itemsPerPage = 5; // desktops and up

    this.calculatePages();
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.similarProducts.length / this.itemsPerPage);

    // Ensure current pages are valid after resize
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  }

  // Paginated getters
  get paginatedNew() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.similarProducts.slice(start, start + this.itemsPerPage);
  }

  // Generate pagination buttons
  get newPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Pagination controls
  nextPage(section: string) {
    this.currentPage++;
  }

  prevPage(section: string) {
    this.currentPage--;
  }
}
