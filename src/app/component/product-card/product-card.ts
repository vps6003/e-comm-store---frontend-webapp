import { CommonVariablesService } from './../../services/common-variables-service';
import { CommonServices } from './../../services/common-services';
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCell } from '@angular/material/table';
import { Product } from '../../types/product';
import { MatIconTooltipDirective } from '../../core/directives/mat-tooltip-directive';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatIconTooltipDirective],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnInit {
  commonServices = inject(CommonServices);
  commonVariablesService = inject(CommonVariablesService);
  private onInitView = false;

  @Input() product: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.commonServices.init();
    this.onInitView = true;
  }

  // shotdesc : string = this.product.shotdescription;
  openImage(imageUrl: string) {
    // Open the image in a modal or new tab
    window.open(imageUrl, '_blank');
  }

  // From PRoduct Card only addition of 1 item is available to change  quantity need to go to cart page
  addToCart(productId: string) {
    const quantity = 1;
    this.commonServices.addToCart(productId, quantity);
    return;
  }

  removeFromCart(productId: string) {
    if (!this.isInCart(productId)) return;
    this.commonServices.removeFromCart(productId);
  }

  isInCart(productId: string): boolean {
    const exists = this.commonVariablesService.cartData?.productQuantity.find(
      // eslint-disable-next-line eqeqeq
      (e: any) => e.productId._id == productId,
    );
    return exists ? true : false;
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
    // eslint-disable-next-line eqeqeq
    const exists = this.commonVariablesService.wishlistArray.find((e) => e._id == productId);
    return exists ? true : false;
  }
}
