import { Injectable } from '@angular/core';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class CommonVariablesService {

  searchTerm:string = "";
  wishlistArray :Product[]=[];
  userData :any;

}
