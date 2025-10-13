import { inject } from "@angular/core"
import { LoaderService } from "../../services/animation-services/loader-spinner/loader-service"
import { HttpInterceptorFn } from "@angular/common/http"
import { finalize } from "rxjs";

export const loaderInterceptor : HttpInterceptorFn = (req,next) =>{

  const loaderService = inject(LoaderService);

  loaderService.show();


  return next(req).pipe(
    finalize(()=>{
      loaderService.hide();
    })
  );

}
