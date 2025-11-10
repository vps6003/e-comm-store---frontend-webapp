import { CustomerServices } from './customer/customer-services';
import { Router } from '@angular/router';
import { AuthServices } from './authorization/auth-services';
import { inject, Injectable } from '@angular/core';
import { Category } from '../types/category';
import { Product } from '../types/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonServices {
  constructor(
    private authServices: AuthServices,
    private router: Router,
    private customerServices: CustomerServices
  ) {}

  getUserDataFromLocalStorage = () => {
    const userData: any = localStorage.getItem('user');
    return JSON.parse(userData);
  };

  getCustomerWishlist() {
    return this.customerServices.getUserWishlist(this.getUserDataFromLocalStorage()?._id).pipe(
      map((result: any) => {
        //update global state or local variable if needed
        return result.productsId; // returning data
      })
    );
  }
}
