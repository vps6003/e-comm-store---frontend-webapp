import { Product } from '../../../../types/product';
import * as WishlistActions from './wishlist.actions';
import { createReducer, on } from '@ngrx/store';

export interface WishlistState {
  wishlist: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

export const initialState: WishlistState = {
  wishlist: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 5,
};

export const wishlistReducer = createReducer(
  initialState,

  on(WishlistActions.loadWishlist, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(WishlistActions.loadWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    wishlist,
    loading: false,
  })),

  on(WishlistActions.loadWishlistFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(WishlistActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),

  on(WishlistActions.setItemsPerPage, (state, { itemsPerPage }) => ({
    ...state,
    itemsPerPage,
  }))
);
