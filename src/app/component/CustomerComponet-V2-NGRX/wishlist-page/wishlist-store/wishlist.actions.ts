import { createAction, props } from '@ngrx/store';
import { Product } from '../../../../types/product';

export const loadWishlist = createAction('[Wishlist] Load Wishlist');
export const loadWishlistSuccess = createAction(
  '[Wishlist] Load Wishlist Success',
  props<{ wishlist: Product[] }>()
);
export const loadWishlistFailure = createAction(
  '[Wishlist] Load Wishlist Failure',
  props<{ error: string }>()
);

// Pagination
export const setCurrentPage = createAction(
  '[Wishlist] Set Current Page',
  props<{ page: number }>()
);

export const setItemsPerPage = createAction(
  '[Wishlist] Set Items Per Page',
  props<{ itemsPerPage: number }>()
);
