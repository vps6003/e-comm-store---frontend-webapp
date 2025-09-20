
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http=inject(HttpClient);

  constructor() { }

  getProducts(){
   return this.http.get<Product>(environment.apiUrl +'product');
  }


  getProductById(id:String){
    return this.http.get<Product>(environment.apiUrl +'product/'+id);
  }

  addProduct(name:String){
    return this.http.post(environment.apiUrl +"product",
      {name:name}
    );
  }

  updateProductById(id:String,obj:any){
     return this.http.put(environment.apiUrl +"product/"+id,
      obj
    );
  }

  deleteProductById(id:String){
     return this.http.delete(environment.apiUrl +"product/"+id)
  }

}
