import { Category } from './../types/category';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + 'category');
  }

  getCustomerCategories() {
    return this.http.get<Category[]>(environment.customerApiUrl + 'home/categories');
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(environment.apiUrl + 'category/' + id);
  }

  addCategory(name: string) {
    return this.http.post(environment.apiUrl + 'category', { name: name });
  }

  updateCategoryById(id: string, obj: any) {
    return this.http.put(environment.apiUrl + 'category/' + id, obj);
  }

  deleteCategoryById(id: string) {
    return this.http.delete(environment.apiUrl + 'category/' + id);
  }
}
