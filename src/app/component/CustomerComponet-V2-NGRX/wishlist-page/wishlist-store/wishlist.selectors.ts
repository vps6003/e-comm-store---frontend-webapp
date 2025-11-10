import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './wishlist.reducer';

export const selectWishlistState = createFeatureSelector<WishlistState>('wishlist');

export const selectWishlist = createSelector(selectWishlistState, (state) => state.wishlist);

export const selectLoading = createSelector(selectWishlistState, (state) => state.loading);

export const selectCurrentPage = createSelector(selectWishlistState, (state) => state.currentPage);

export const selectItemsPerPage = createSelector(
  selectWishlistState,
  (state) => state.itemsPerPage
);

export const selectPaginatedWishlist = createSelector(
  selectWishlist,
  selectCurrentPage,
  selectItemsPerPage,
  (wishlist, currentPage, itemsPerPage) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return wishlist.slice(start, end);
  }
);

export const selectTotalPages = createSelector(
  selectWishlist,
  selectItemsPerPage,
  (wishlist, itemsPerPage) => {
    return Math.ceil(wishlist.length / itemsPerPage);
  }
);

// 👇 NEW selector for clean pagination buttons
export const selectPageArray = createSelector(selectTotalPages, (totalPages) =>
  Array.from({ length: totalPages }, (_, i) => i + 1)
);
