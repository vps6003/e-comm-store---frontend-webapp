import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthServices } from "../services/authorization/auth-services";
import { CommonServices } from "../services/common-services";

export const authGuard : CanActivateFn = (route,state) =>{
  const authService = inject(AuthServices);
  const commonService = inject(CommonServices);
  const router = inject(Router);
  if(authService.isLoggedIn)
  {
    const obj = {isLoggedIn : true};
    commonService.verifyToken(obj);
     return true;
  }
    router.navigateByUrl('/login');
    return false;

}


