import { Router } from '@angular/router';
import { AuthServices } from './authorization/auth-services';
import { inject, Injectable } from '@angular/core';
import { CategoryService } from './category';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CommonServices {
  constructor(private authServices : AuthServices,
    private router :Router,
  private categoryService :CategoryService){

      this.isLoggedIn = this.authServices.isLoggedIn;
    }

    isLoggedIn:any;


  verifyToken(obj?:any){
    this.authServices.verifyTokenService().subscribe(
      {
        next:(result:any)=>{
      },
      error : (err) =>{
        localStorage.clear();
        sessionStorage.clear();
        const router = inject(Router);
        if(obj.isLoggedIn || this.authServices.isLoggedIn){
          alert("Session Expired, Please Login again!");
        }
        router.navigateByUrl("/register");

      }
  });
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl("/register");
    window.location.reload();
  }


}
