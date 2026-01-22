import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommonServices } from '../../../../services-ngrx/common-services';
import * as WishlistActions from './wishlist.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { CustomerServices } from '../../../../services-ngrx/customer/customer-services';

@Injectable()
export class WishlistEffects {
  // constructor(
  //   private actions$: Actions,
  //   private commonServices: CommonServices,
  //   private customerServices: CustomerServices
  // ) {
  //   if (!actions$) {
  //     console.error('❌ Actions stream is undefined! Effect not created by NgRx!');
  //   } else {
  //     console.log('✅ NgRx effect initialized');
  //   }
  // }
  // console.log(this.actions$);

  private actions$ = inject(Actions);
  private commonServices = inject(CommonServices);
  private customerServices = inject(CustomerServices);
  // ✅ Effect to load wishlist from API
  loadWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.loadWishlist),
      switchMap(() => {
        const userId = this.commonServices.getUserDataFromLocalStorage()?._id;

        if (!userId) {
          return of(WishlistActions.loadWishlistFailure({ error: 'User not logged in' }));
        }

        return this.customerServices.getUserWishlist(userId).pipe(
          map((result: any) => {
            // 🕵️‍♀️ You can check/transform data here
            // console.log('📦 API Result:', result);

            if (
              !result ||
              result.length === 0 ||
              !result?.productsId ||
              !result?.productsId.length
            ) {
              // Example: handle empty wishlist specially
              return WishlistActions.loadWishlistFailure({ error: 'No wishlist items found' });
            }

            // Example: transform data before sending to reducer
            const formattedResult = result.productsId.map((item: any) => ({
              ...item,
              // displayName: item.name.toUpperCase(), // just a demo transformation
            }));

            // Finally dispatch success action with modified data
            return WishlistActions.loadWishlistSuccess({ wishlist: formattedResult });
          }),
          catchError((error) =>
            of(
              WishlistActions.loadWishlistFailure({
                error: error.message || 'Failed to load wishlist',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
