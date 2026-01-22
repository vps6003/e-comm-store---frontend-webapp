import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product>(environment.apiUrl + 'getProducts');
  }

  getProductById(id: string) {
    return this.http.get<Product>(environment.apiUrl + 'getProducts/' + id);
  }

  addProduct(obj: any) {
    return this.http.post(environment.apiUrl + 'addProduct', obj);
  }

  updateProductById(id: string, obj: any) {
    return this.http.put(environment.apiUrl + 'updateProduct/' + id, obj);
  }

  deleteProductById(id: string) {
    return this.http.delete(environment.apiUrl + 'deleteProduct/' + id);
  }
}
