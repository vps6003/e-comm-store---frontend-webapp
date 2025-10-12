import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { BehaviorSubject as bS } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonVariablesService {

  searchTerm:string = "";
  wishlistArray :Product[]=[];
  userData :any;
  cartData :any;
  orderSuccessData :any;
  allCategories :Category[]=[];
  ordersData:any;
  orderDetails:any;
  userName$ = new bS<string>('');
  userDetails$ =new bS<any>(null);
  loggedIn$ = new bS<boolean>(false);

}
