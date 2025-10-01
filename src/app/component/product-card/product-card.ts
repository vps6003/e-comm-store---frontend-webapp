import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCell } from "@angular/material/table";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatCell
],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() product: any;

  // shotdesc : string = this.product.shotdescription;
  openImage(imageUrl: string) {
    // Open the image in a modal or new tab
    window.open(imageUrl, '_blank');
  }

  addToCart(product:any){
    return;
  }

  addToWishlist(product:any){

  }
}
