// import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { inject } from '@angular/core';
// ErrorHandlerService

// export const errorInterceptor: HttpInterceptorFn = (req, next) => {
//   const errorHandler = inject(ErrorHandlerService);

//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       // 👇 Only called when service/API returns error response
//       errorHandler.handleError(error);

//       // Pass the error forward if needed
//       return throwError(() => error);
//     })
//   );
// };
