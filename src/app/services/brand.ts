import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http=inject(HttpClient);

  constructor() { }

  getBrands(){
   return this.http.get<Brand>(environment.apiUrl +'brand');
  }


  getBrandById(id:String){
    return this.http.get<Brand>(environment.apiUrl +'brand/'+id);
  }

  addBrand(name:String){
    return this.http.post(environment.apiUrl +"brand",
      {brandName:name}
    );
  }

  updateBrandById(id:String,obj:any){
     return this.http.put(environment.apiUrl +"brand/"+id,
      obj
    );
  }

  deleteBrandById(id:String){
     return this.http.delete(environment.apiUrl +"brand/"+id)
  }

}
