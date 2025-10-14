import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToasterMessageService } from '../../services/toaster-message-service';
import { LoaderService } from '../../services/animation-services/loader-spinner/loader-service';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const snackBar = inject(MatSnackBar);
  const toast = inject(ToasterMessageService);
  const loader = inject(LoaderService);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      loader.hide();
      let errorMessage = 'An unexpected error occured.';
      if (error.error instanceof ErrorEvent) {
        // Client side or network error
        errorMessage = `Client Error :  ${error.error.message}`;
      } else {
        // Backend Error

        switch (error.status) {
          case 0:
            errorMessage = 'Network Error, Please check you network connection!';
            break;

          case 400:
            errorMessage = error.error?.message || 'Bad Request!';
            break;

          case 401:
            errorMessage = error.error?.message || 'Unauthorized. Please Login In Again!';
            break;

          case 403:
            errorMessage = error.error?.message || 'Access Denied';
            break;

          case 404:
            errorMessage =
              error.error?.messge || 'Requested Resource Not Found or Data not available!';
            break;

          case 500:
            errorMessage = error.error?.message || 'Internal Server Error';
            break;

          default:
            errorMessage = error.error?.message || `Error: ${error.statusText}`;
        }
      }
      //show Snackbar notification
      // snackBar.open(errorMessage, 'Close', {
      //   duration: 4000,
      //   horizontalPosition: 'right',
      //   verticalPosition: 'top',
      // });

      //showing toaster
      toast.show(errorMessage,"error",5000);



      // 🔹 Rethrow the error for further handling if needed
      return throwError(() => new Error(errorMessage));
    })

  );
};
