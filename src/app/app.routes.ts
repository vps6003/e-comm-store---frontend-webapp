import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Categories } from './component/manage/categories/categories';
import { CategoryForm } from './component/manage/category-form/category-form';
import { BrandForm } from './component/manage/brand-form/brand-form';
import { Brands } from './component/manage/brands/brands';
import { Products } from './component/manage/products/products';
import { ProductForm } from './component/manage/product-form/product-form';

export const routes: Routes = [
  {
    path:"",
    component:Home
  },
  {
    path:"admin/categories",
    component:Categories
  },
  {
    path:"admin/categories/add",
    component:CategoryForm
  },
  {
    path:"admin/categories/:id",
    component:CategoryForm
  },
  {
    path:"admin/brand",
    component:Brands
  },
  {
    path:"admin/brand/add",
    component:BrandForm
  },
  {
    path:"admin/brand/:id",
    component:BrandForm
  },  {
    path:"admin/product",
    component:Products
  },
  {
    path:"admin/product/add",
    component:ProductForm
  },
  {
    path:"admin/product/:id",
    component:ProductForm
  },
];
