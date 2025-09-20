import { Category } from './../types/category';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http=inject(HttpClient);

  constructor() { }

  getCategories(){
   return this.http.get<Category[]>(environment.apiUrl +'category');
  }


  getCategoryById(id:String){
    return this.http.get<Category>(environment.apiUrl +'category/'+id);
  }

  addCategory(name:String){
    return this.http.post(environment.apiUrl +"category",
      {name:name}
    );
  }

  updateCategoryById(id:String,obj:any){
     return this.http.put(environment.apiUrl +"category/"+id,
      obj
    );
  }

  deleteCategoryById(id:String){
     return this.http.delete(environment.apiUrl +"category/"+id)
  }

}
