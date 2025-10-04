import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Categories } from './component/manage/categories/categories';
import { CategoryForm } from './component/manage/category-form/category-form';
import { BrandForm } from './component/manage/brand-form/brand-form';
import { Brands } from './component/manage/brands/brands';
import { Products } from './component/manage/products/products';
import { ProductForm } from './component/manage/product-form/product-form';
import { ProductDetailsPage } from './component/CustomerComponent/product-details-page/product-details-page';
import { ProductListPage } from './component/CustomerComponent/product-list-page/product-list-page';
import { Register } from './component/register/register';
import { authGuard } from './core/auth-guard';
import { adminGuard } from './core/admin-guard';
import { AdminDashboard } from './component/admin-dashboard/admin-dashboard';
import { WishlistPage } from './component/CustomerComponent/wishlist-page/wishlist-page';
import { CartPage } from './component/CustomerComponent/cart-page/cart-page';
import { CheckoutPage } from './component/checkout-page/checkout-page';
import { OrderSuccessPage } from './component/CustomerComponent/order-success-page/order-success-page';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'customer/wishlist',
    component: WishlistPage,
    canActivate: [authGuard],
  },
  {
    path: 'order-success',
    component: OrderSuccessPage,
    canActivate: [authGuard],
  },
  {
    path: 'customer/cart',
    component: CartPage,
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    component: CheckoutPage,
    canActivate: [authGuard],
  },
  {
    path: 'admin/categories',
    component: Categories,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/add',
    component: CategoryForm,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/categories/:id',
    component: CategoryForm,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/brand',
    component: Brands,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/brand/add',
    component: BrandForm,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/brand/:id',
    component: BrandForm,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/product',
    component: Products,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/product/add',
    component: ProductForm,
    canActivate: [adminGuard],
  },

  {
    path: 'admin/product/:id',
    component: ProductForm,
    canActivate: [adminGuard],
  },

  {
    path: 'products',
    component: ProductListPage,
    canActivate: [authGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailsPage,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'admin',
    component : AdminDashboard,
    canActivate : [adminGuard]
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  }, // Redirect root to login
  {
    path: '**',
    redirectTo: '/register',
  }, // Redirect unknown routes to login
];
