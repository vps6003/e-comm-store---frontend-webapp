import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { wishlistReducer } from './component/CustomerComponet-V2-NGRX/wishlist-page/wishlist-store/wishlist.reducer';
import { WishlistEffects } from './component/CustomerComponet-V2-NGRX/wishlist-page/wishlist-store/wishlist.effects';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./component/home/home').then((m) => m.Home),
  },
  // {
  //   path: 'customer/wishlist',
  //   canActivate: [authGuard],
  //   loadComponent: () =>
  //     import('./component/CustomerComponent/wishlist-page/wishlist-page').then(
  //       m => m.WishlistPage
  //     ),
  // },
  {
    path: 'customer/wishlist',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./component/CustomerComponet-V2-NGRX/wishlist-page/wishlist-page').then(
        (m) => m.WishlistPage,
      ),
    providers: [
      provideState('wishlist', wishlistReducer), // ✅ Correct usage
      provideEffects([WishlistEffects]), // ✅ Correct
    ],
  },
  {
    path: 'orderDetails',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./component/CustomerComponent/order-details-page/order-details-page').then(
        (m) => m.OrderDetailsPage,
      ),
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () => import('./component/order-page/order-page').then((m) => m.OrderPage),
  },
  {
    path: 'customer/cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./component/CustomerComponent/cart-page/cart-page').then((m) => m.CartPage),
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./component/checkout-page/checkout-page').then((m) => m.CheckoutPage),
  },
  {
    path: 'admin/categories',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/categories/categories').then((m) => m.Categories),
  },
  {
    path: 'admin/categories/add',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/category-form/category-form').then((m) => m.CategoryForm),
  },
  {
    path: 'admin/categories/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/category-form/category-form').then((m) => m.CategoryForm),
  },
  {
    path: 'admin/brand',
    canActivate: [adminGuard],
    loadComponent: () => import('./component/admin/manage/brands/brands').then((m) => m.Brands),
  },
  {
    path: 'admin/brand/add',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/brand-form/brand-form').then((m) => m.BrandForm),
  },
  {
    path: 'admin/brand/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/brand-form/brand-form').then((m) => m.BrandForm),
  },
  {
    path: 'admin/product',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/products/products').then((m) => m.Products),
  },
  {
    path: 'admin/product/add',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/product-form/product-form').then((m) => m.ProductForm),
  },
  {
    path: 'admin/product/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/manage/product-form/product-form').then((m) => m.ProductForm),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./component/CustomerComponent/product-list-page/product-list-page').then(
        (m) => m.ProductListPage,
      ),
  },
  {
    path: 'product/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./component/CustomerComponent/product-details-page/product-details-page').then(
        (m) => m.ProductDetailsPage,
      ),
  },
  {
    path: 'register',
    loadComponent: () => import('./component/register/register').then((m) => m.Register),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./component/admin/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./component/CustomerComponent/profile/profile').then((m) => m.Profile),
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/register',
  },
];
