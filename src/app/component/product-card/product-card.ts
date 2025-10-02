import { CommonVariablesService } from './../../services/common-variables-service';
import { CommonServices } from './../../services/common-services';
import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCell } from "@angular/material/table";
import { Product } from '../../types/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() product: any;

  constructor(
    public commonServices :CommonServices,
    public commonVariablesService :CommonVariablesService,

  ){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.commonServices.init();

  }

  // shotdesc : string = this.product.shotdescription;
  openImage(imageUrl: string) {
    // Open the image in a modal or new tab
    window.open(imageUrl, '_blank');
  }

  addToCart(product:any){
    return;
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
