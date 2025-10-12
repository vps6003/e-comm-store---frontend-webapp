import { Component, inject, OnInit, HostListener } from '@angular/core';
import { CustomerServices } from '../../services/customer/customer-services';
import { CommonServices } from './../../services/common-services';
import { Product } from '../../types/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductCard } from '../product-card/product-card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    ProductCard,
    CarouselModule,
    NgClass,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  customerServices = inject(CustomerServices);
  commonServices = inject(CommonServices);

  // Carousel options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1024: { items: 4 },
      1280: { items: 5 },
    },
  };

  // Product arrays
  newProducts: Product[] = [];
  bestSellers: Product[] = [];
  featuredProducts: Product[] = [];

  // Pagination state
  currentPageNew = 1;
  currentPageBest = 1;
  currentPageFeatured = 1;

  // Items per page (responsive)
  itemsPerPage = 4;

  // Total page counts
  totalPagesNew = 0;
  totalPagesBest = 0;
  totalPagesFeatured = 0;

  ngOnInit() {
    this.updateItemsPerPage();

    this.customerServices.getNewArrivals().subscribe((products) => {
      this.newProducts = products;
      this.calculatePages();
    });

    this.customerServices.getBestSellers().subscribe((products) => {
      this.bestSellers = products;
      this.calculatePages();
    });

    this.customerServices.getFeaturedProducts().subscribe((products) => {
      this.featuredProducts = products;
      this.calculatePages();
    });

    this.commonServices.init();
  }

  // Dynamically adjust items per page based on screen width
  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerPage();
  }

  updateItemsPerPage() {
    const width = window.innerWidth;

    if (width < 640) this.itemsPerPage = 1; // mobile
    else if (width < 768) this.itemsPerPage = 2; // small tablets
    else if (width < 1024) this.itemsPerPage = 3; // tablets
    else if (width < 1200) this.itemsPerPage = 4; // landscape tablets
    else this.itemsPerPage = 5; // desktops and up

    this.calculatePages();
  }

  calculatePages() {
    this.totalPagesNew = Math.ceil(this.newProducts.length / this.itemsPerPage);
    this.totalPagesBest = Math.ceil(this.bestSellers.length / this.itemsPerPage);
    this.totalPagesFeatured = Math.ceil(this.featuredProducts.length / this.itemsPerPage);

    // Ensure current pages are valid after resize
    this.currentPageNew = Math.min(this.currentPageNew, this.totalPagesNew || 1);
    this.currentPageBest = Math.min(this.currentPageBest, this.totalPagesBest || 1);
    this.currentPageFeatured = Math.min(this.currentPageFeatured, this.totalPagesFeatured || 1);
  }

  // Paginated getters
  get paginatedNew() {
    const start = (this.currentPageNew - 1) * this.itemsPerPage;
    return this.newProducts.slice(start, start + this.itemsPerPage);
  }

  get paginatedBest() {
    const start = (this.currentPageBest - 1) * this.itemsPerPage;
    return this.bestSellers.slice(start, start + this.itemsPerPage);
  }

  get paginatedFeatured() {
    const start = (this.currentPageFeatured - 1) * this.itemsPerPage;
    return this.featuredProducts.slice(start, start + this.itemsPerPage);
  }

  // Pagination controls
  goToPage(section: string, page: number) {
    if (section === 'new') this.currentPageNew = page;
    if (section === 'best') this.currentPageBest = page;
    if (section === 'featured') this.currentPageFeatured = page;
  }

  nextPage(section: string) {
    if (section === 'new' && this.currentPageNew < this.totalPagesNew) this.currentPageNew++;
    if (section === 'best' && this.currentPageBest < this.totalPagesBest) this.currentPageBest++;
    if (section === 'featured' && this.currentPageFeatured < this.totalPagesFeatured)
      this.currentPageFeatured++;
  }

  prevPage(section: string) {
    if (section === 'new' && this.currentPageNew > 1) this.currentPageNew--;
    if (section === 'best' && this.currentPageBest > 1) this.currentPageBest--;
    if (section === 'featured' && this.currentPageFeatured > 1) this.currentPageFeatured--;
  }

  // Generate pagination buttons
  get newPages(): number[] {
    return Array.from({ length: this.totalPagesNew }, (_, i) => i + 1);
  }

  get bestPages(): number[] {
    return Array.from({ length: this.totalPagesBest }, (_, i) => i + 1);
  }

  get featuredPages(): number[] {
    return Array.from({ length: this.totalPagesFeatured }, (_, i) => i + 1);
  }
}
