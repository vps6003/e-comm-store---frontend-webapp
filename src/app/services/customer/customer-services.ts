import { CommonVariablesService } from './../common-variables-service';
import { CommonServices } from './../common-services';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { Review } from '../../types/reviews';
import { Order } from '../../types/order';

@Injectable({
  providedIn: 'root',
})
export class CustomerServices {
  commonVariablesService = inject(CommonVariablesService);
  private http = inject(HttpClient);

  getNewArrivals() {
    return this.http.get<Product[]>(`${environment.customerApiUrl}home/new-arrivals`);
  }

  getBestSellers() {
    return this.http.get<Product[]>(`${environment.customerApiUrl}home/best-sellers`);
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(`${environment.customerApiUrl}home/featured-products`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${environment.customerApiUrl}home/categories`);
  }

  getProductById(id: string) {
    return this.http.get<Product[]>(`${environment.customerApiUrl}home/product/` + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(`${environment.customerApiUrl}home/brands`);
  }

  getProductsList(queryReqParams: any) {
    let queryParams = '';
    if (queryReqParams && queryReqParams.searchTerm) {
      queryParams = queryParams + `searchTerm=` + queryReqParams.searchTerm;
    }
    if (queryReqParams && queryReqParams.categoryId) {
      if (queryParams.length > 1) {
        queryParams = queryParams + `&categoryId=` + queryReqParams.categoryId;
      } else {
        queryParams = queryParams + `categoryId=` + queryReqParams.categoryId;
      }
    }
    if (queryReqParams && queryReqParams.brandId) {
      if (queryParams.length > 1) {
        queryParams = queryParams + `&brandId=` + queryReqParams.brandId;
      } else {
        queryParams = queryParams + `brandId=` + queryReqParams.brandId;
      }
    }
    if (queryReqParams && queryReqParams.sortBy) {
      if (queryParams.length > 1) {
        queryParams = queryParams + `&sortBy=` + queryReqParams.sortBy;
      } else {
        queryParams = queryParams + `sortBy=` + queryReqParams.sortBy;
      }
    }
    if (queryReqParams && queryReqParams.sortOrder) {
      if (queryParams.length > 1) {
        queryParams = queryParams + `&sortOrder=` + queryReqParams.sortOrder;
      } else {
        queryParams = queryParams + `sortOrder=` + queryReqParams.sortOrder;
      }
    }
    if (queryReqParams && queryReqParams.page) {
      if (queryParams.length > 1) {
        queryParams = queryParams + `&page=` + queryReqParams.page;
      } else {
        queryParams = queryParams + `page=` + queryReqParams.page;
      }
    }
    if (queryReqParams && queryReqParams.pageSize) {
      if (queryParams.length > 1) {
        queryParams = queryParams + `&pageSize=` + queryReqParams.pageSize;
      } else {
        queryParams = queryParams + `pageSize=` + queryReqParams.pageSize;
      }
    }

    return this.http.get<Product[]>(
      `${environment.customerApiUrl}home/products-list?` + queryParams,
    );
  }

  getSimilarProductsList(queryReqParams: any) {
    let queryParams = '';
    if (queryReqParams && queryReqParams.categoryId) {
      queryParams = queryParams + `categoryId=` + queryReqParams.categoryId;
    }
    if (queryReqParams && queryReqParams.brandId) {
      if (queryParams.length > 1) {
        queryParams = queryParams + `&brandId=` + queryReqParams.brandId;
      } else {
        queryParams = queryParams + `brandId=` + queryReqParams.brandId;
      }
    }

    return this.http.get<Product[]>(
      `${environment.customerApiUrl}home/similar-products-list?` + queryParams,
    );
  }

  addReviews(id: string, obj: Review) {
    return this.http.post(`${environment.customerApiUrl}home/product/` + id + '/add-reviews', obj);
  }

  getUserWishlist(id: string) {
    return this.http.get<Product[]>(`${environment.customerApiUrl}wishlists?userId=` + id);
  }

  addToWishlist(addObj: any) {
    return this.http.post<Product[]>(`${environment.customerApiUrl}wishlists/add`, addObj);
  }

  removeFromWishList(addObj: any) {
    return this.http.delete<Product[]>(`${environment.customerApiUrl}wishlists/remove`, {
      body: addObj,
    });
  }

  getUserCart(id: string) {
    return this.http.get<Product[]>(`${environment.customerApiUrl}cart/getCartItem?userId=` + id);
  }

  addToCart(addObj: any) {
    return this.http.post<Product[]>(`${environment.customerApiUrl}cart/updateCart`, addObj);
  }

  removeFromCart(addObj: any) {
    return this.http.delete<Product[]>(`${environment.customerApiUrl}cart/removeFromCart`, {
      body: addObj,
    });
  }

  clearCart(addObj: any) {
    return this.http.delete<Product[]>(`${environment.customerApiUrl}cart/clearCart`, {
      body: addObj,
    });
  }

  newOrder(obj: any) {
    return this.http.post(`${environment.customerApiUrl}order/neworder`, obj);
  }

  getAllUSerOrders(userId: string) {
    return this.http.get(`${environment.customerApiUrl}order/getCustomerOrders/` + userId);
  }

  getOrderDetails(orderId: string) {
    return this.http.get(`${environment.customerApiUrl}order/getUserOrders/` + orderId);
  }

  updateUserName(obj: any) {
    return this.http.post(`${environment.customerApiUrl}profile/updateUserName`, obj);
  }

  changePassword(obj: any) {
    return this.http.post(`${environment.customerApiUrl}profile/changePassword`, obj);
  }

  getProfileDetails(params: any) {
    return this.http.get(`${environment.customerApiUrl}profile/getUserDetails`, { params });
  }
}
