import { ToasterMessageService } from './toaster-message-service';
import { CommonVariablesService } from './common-variables-service';
import { CustomerServices } from './customer/customer-services';
import { Router } from '@angular/router';
import { AuthServices } from './authorization/auth-services';
import { inject, Injectable } from '@angular/core';
import { CategoryService } from './category';
import { Category } from '../types/category';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class CommonServices {
  constructor(
    private authServices: AuthServices,
    private router: Router,
    private categoryService: CategoryService,
    private customerServices: CustomerServices,
    private commonVariablesService: CommonVariablesService,
    private toasterMessageService :ToasterMessageService
  ) {
    this.isLoggedIn = this.authServices.isLoggedIn;
  }

  isLoggedIn: any;

  init(onLoad?:boolean) {
    if(onLoad)return;
    this.commonVariablesService.searchTerm = '';
    this.commonVariablesService.wishlistArray = [];
    this.commonVariablesService.userDetails$.next(null);
    // this.commonVariablesService.cartData = [];
    this.getCustomerWishlist();
    this.getCustomerCart();
    this.getUserDataFromStorage();
    this.getProfileDetails();
  }

  async getUserDataFromStorage() {
    const userData: any = await localStorage.getItem('user');
    this.commonVariablesService.userData = JSON.parse(userData);
  }

  async getCustomerWishlist() {
    await this.getUserDataFromStorage();
    this.customerServices
      .getUserWishlist(this.commonVariablesService.userData?._id)
      .subscribe((result: any) => {
        this.commonVariablesService.wishlistArray = result.productsId;
      });
  }

  addToWishlist(id: string) {
    const addObj = {
      userId: this.commonVariablesService.userData._id,
      productId: id,
    };
    this.customerServices.addToWishlist(addObj).subscribe((result: any) => {
      this.getCustomerWishlist();
    });
  }

  removeFromWishList(id: string) {
    const addObj = {
      userId: this.commonVariablesService.userData._id,
      productId: id,
    };
    this.customerServices.removeFromWishList(addObj).subscribe((result: any) => {
      this.getCustomerWishlist();
    });
  }

  async getCustomerCart() {
    await this.getUserDataFromStorage();
    this.customerServices
      .getUserCart(this.commonVariablesService.userData?._id)
      .subscribe((result: any) => {
        this.commonVariablesService.cartData = result;
      });
  }

  addToCart(id: string, quantity: number) {
    const addObj = {
      userId: this.commonVariablesService.userData._id,
      productId: id,
      quantity: quantity,
    };
    // console.log("cart addobj  == ", addObj);
    this.customerServices.addToCart(addObj).subscribe((result: any) => {
      // console.log("Cart Schema : ",result);
      this.getCustomerCart();
    });
  }

  removeFromCart(id: string) {
    const addObj = {
      userId: this.commonVariablesService.userData._id,
      productId: id,
    };
    this.customerServices.removeFromCart(addObj).subscribe((result: any) => {
      // console.log("cart Schema : ",result);
      // console.log("Removed from Cart : ", id);
      this.getCustomerCart();
    });
  }

  verifyToken(obj?: any) {
    try{
    this.authServices.verifyTokenService().subscribe({
      next : (res) =>{
        this.loggedInValue = true;
      },
      error :(err) =>{ localStorage.clear();
        sessionStorage.clear();
        const router = inject(Router);
        this.loggedInValue = false;
        router.navigateByUrl('/register');
        this.toasterMessageService.show(err.message,"error",5000);
}
    });
  }
  catch(err: any){
     localStorage.clear();
        sessionStorage.clear();
        const router = inject(Router);
        this.loggedInValue = false;
        router.navigateByUrl('/register');
        this.toasterMessageService.show(err,"error",5000);

  }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.loggedInValue = false;
    this.router.navigateByUrl('/register');
    window.location.reload();
  }

  async newOrder(obj: any) {
    try {
      this.customerServices.newOrder(obj).subscribe((result: any) => {
         this.clearCart();
        //  this.router.navigateByUrl('/order-success');
        this.commonVariablesService.orderSuccessData  = result;


      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async clearCart() {
    try {
      const addObj = {userId : this.commonVariablesService.userData._id}
      this.customerServices.clearCart(addObj).subscribe((result: any) => {
        this.toasterMessageService.show("Cart Cleared!","success");
        this.getCustomerCart();
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getAllCategoriesForCustomer(onLoad?:boolean){
    if(onLoad) return;
    try{
      this.categoryService.getCustomerCategories().subscribe((categories: Category[]) => {
      this.commonVariablesService.allCategories = categories;
    });
    }
    catch(err:any){
      throw new Error(err.message);
    }
  }

  async getAllOrdersOfUSer(onLoad?:boolean){
    if(onLoad) return;
    try {
      const user = localStorage.getItem('user');
      const userData = JSON.parse(user || '{}');
      this.commonVariablesService.userData = userData;
      await this.customerServices.getAllUSerOrders(this.commonVariablesService?.userData?._id).subscribe((result:any)=>{
        this.commonVariablesService.ordersData = result;
        // console.log(result);
      });
    }
    catch(err:any){
      throw new Error(err.message);
    }
  }

  async getOrderDetails(orderId:string){
    try {
      await this.customerServices.getOrderDetails(orderId).subscribe((result:any)=>{
        this.commonVariablesService.orderDetails = result;
        // console.log(result);
      });
    }
    catch(err:any){
      throw new Error(err.message);
    }
  }

  get loggedInValue(){
    return this.commonVariablesService.loggedIn$.value;
  }

  set loggedInValue(val:boolean){
    this.commonVariablesService.loggedIn$.next(val);
  }

  get userName(){
    return this.commonVariablesService.userName$.value;
  }

  set userName(val:string){
    this.commonVariablesService.userName$.next(val);
  }

  async updateUsername(userId:string,userName:string){
    try{
      const obj = {
        userId,
        name:userName
      }
      this.customerServices.updateUserName(obj).subscribe((res:any)=>{
        this.toasterMessageService.show(res?.message,"success",3000);
        this.userName = userName;
      })
    }
    catch(err:any){
      throw new Error(err);
        this.toasterMessageService.show(err?.message,"error",3000);

    }
  }

  async changePassword(obj:any){
    try{
      this.customerServices.changePassword(obj).subscribe((res:any)=>{
        this.toasterMessageService.show(res?.message,"success",3000);
      })
    }
    catch(err:any){
      throw new Error(err);
        this.toasterMessageService.show(err?.message,"error",3000);

    }
  }

  getProfileDetails(){
    try{

      const user = localStorage.getItem('user');
      const userData = JSON.parse(user || '{}');
      this.commonVariablesService.userData = userData;
      const userId = userData._id;
      this.customerServices.getProfileDetails({userId : userId}).subscribe((result:any)=>{
        this.userName = result.name;
        this.commonVariablesService.userDetails$.next(result);
        this.toasterMessageService.show("User Details fetched","success",2500);
      })
    }
    catch(err:any){
      throw new Error(err.message);
    }
  }


}
