import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CustomerServices } from '../../services/customer/customer-services';
import { Product } from '../../types/product';
import { ProductCard } from '../product-card/product-card';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    ProductCard,
    CarouselModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true, // Enable autoplay
    autoplayTimeout: 2500, // Set autoplay interval in milliseconds (e.g., 2.5 seconds)
    autoplayHoverPause: true, // Pause autoplay on hover
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   400: {
    //     items: 2
    //   },
    //   740: {
    //     items: 3
    //   },
    //   940: {
    //     items: 4
    //   }
    // },
    nav: true,
  };

  constructor() {}
  customerServices = inject(CustomerServices);
  newProducts: Product[] = [];
  bestSellers: Product[] = [];
  featuredProducts: Product[] = [];

  ngOnInit() {
    this.customerServices.getNewArrivals().subscribe((products) => {
      this.newProducts = products;
    });
    this.customerServices.getBestSellers().subscribe((products) => {
      this.bestSellers = products;
    });
    this.customerServices.getFeaturedProducts().subscribe((products) => {
      this.featuredProducts = products;
    });
  }
}
