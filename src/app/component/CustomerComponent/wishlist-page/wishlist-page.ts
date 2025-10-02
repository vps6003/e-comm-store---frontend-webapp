import { CommonVariablesService } from './../../../services/common-variables-service';
import { CommonServices } from './../../../services/common-services';
import { Component } from '@angular/core';
import { ProductCard } from '../../product-card/product-card';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-wishlist-page',
  imports: [ProductCard],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.scss',
})
export class WishlistPage {
  constructor(
    private commonServices: CommonServices,
    private commonVariablesService: CommonVariablesService
  ) {}

  wishlist: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.wishlist = this.commonVariablesService.wishlistArray;
  }

  get totalPages(): number {
    return Math.ceil(this.wishlist.length / this.itemsPerPage);
  }

  get paginatedWishlist() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.wishlist.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /** Generate page numbers smartly */
  get paginationRange(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // how many pages to show around current
    const range: (number | string)[] = [];

    // Always include first page
    if (1 !== current - delta && 1 !== current) {
      range.push(1);
      if (current - delta > 2) {
        range.push('...');
      }
    }

    // Pages around current
    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }

    // Always include last page
    if (total !== current + delta && total !== current) {
      if (current + delta < total - 1) {
        range.push('...');
      }
      range.push(total);
    }

    return range;
  }
  goToFirstPage() {
    this.currentPage = 1;
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.wishlist.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
