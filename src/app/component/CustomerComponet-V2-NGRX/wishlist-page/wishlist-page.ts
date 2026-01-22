import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ProductCard } from '../../product-card/product-card';
import { Store } from '@ngrx/store';
import {
  selectCurrentPage,
  selectPaginatedWishlist,
  selectTotalPages,
  selectPageArray,
} from './wishlist-store/wishlist.selectors';
import * as WishlistActions from './wishlist-store/wishlist.actions';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [ProductCard, AsyncPipe],
  templateUrl: './wishlist-page.html',
  styleUrls: ['./wishlist-page.scss'],
})
export class WishlistPage implements OnInit {
  private store = inject(Store);

  wishlist$ = this.store.select(selectPaginatedWishlist);
  totalPages$ = this.store.select(selectTotalPages);
  currentPage$ = this.store.select(selectCurrentPage);
  pageArray$ = this.store.select(selectPageArray);

  ngOnInit() {
    this.store.dispatch(WishlistActions.loadWishlist());
    this.updateItemsPerPage();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerPage();
  }

  updateItemsPerPage() {
    const width = window.innerWidth;
    let itemsPerPage = 5;

    if (width < 640) itemsPerPage = 1;
    else if (width < 768) itemsPerPage = 2;
    else if (width < 1024) itemsPerPage = 3;
    else if (width < 1200) itemsPerPage = 4;
    else itemsPerPage = 5;

    this.store.dispatch(WishlistActions.setItemsPerPage({ itemsPerPage }));
  }

  goToPage(page: number) {
    this.store.dispatch(WishlistActions.setCurrentPage({ page }));
  }

  nextPage(currentPage: number, totalPages: number) {
    if (currentPage < totalPages) {
      this.store.dispatch(WishlistActions.setCurrentPage({ page: currentPage + 1 }));
    }
  }

  prevPage(currentPage: number) {
    if (currentPage > 1) {
      this.store.dispatch(WishlistActions.setCurrentPage({ page: currentPage - 1 }));
    }
  }
}
