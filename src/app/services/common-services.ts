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
    private categoryService : CategoryService,
    private customerServices : CustomerServices,
    private commonVariablesService : CommonVariablesService,
  ) {
    this.isLoggedIn = this.authServices.isLoggedIn;
  }

  isLoggedIn: any;

  init(){
    this.commonVariablesService.searchTerm ="";
    this.commonVariablesService.wishlistArray = [];
    this.getCustomerWishlist();
    this.getUserDataFromStorage();
  }

  async getUserDataFromStorage(){
    const userData:any = await localStorage.getItem("user");
    this.commonVariablesService.userData = JSON.parse(userData);
  }

 async   getCustomerWishlist(){
   await this.getUserDataFromStorage();
    this.customerServices.getUserWishlist(this.commonVariablesService.userData?._id).subscribe((result:any) =>{
      this.commonVariablesService.wishlistArray = result.productsId;
      // console.log("User Wishlist",result);
    })
  }

  addToWishlist(id:string){
      const addObj = {
          userId: this.commonVariablesService.userData._id,
          productId : id
        }
    this.customerServices.addToWishlist(addObj).subscribe((result:any)=>{
      // console.log("Wishlist Schema : ",result);
      this.getCustomerWishlist();
    })

  }

  removeFromWishList(id:string){
    const addObj = {
          userId: this.commonVariablesService.userData._id,
          productId : id
        }
    this.customerServices.removeFromWishList(addObj).subscribe((result:any)=>{
      console.log("Wishlist Schema : ",result);
      console.log("Removed from Wishlist : ", id);
      this.getCustomerWishlist();
    })

  }

  verifyToken(obj?: any) {
    this.authServices.verifyTokenService().subscribe({
      next: (result: any) => {},
      error: (err) => {
        localStorage.clear();
        sessionStorage.clear();
        const router = inject(Router);
        // if(obj.isLoggedIn || this.authServices.isLoggedIn){
        // alert("Session Expired, Please Login again!");
        // }
        router.navigateByUrl('/register');
      },
    });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/register');
    window.location.reload();
  }


}
