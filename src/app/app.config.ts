import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenHttpInterceptor } from './core/interceptors/token-auth-interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenHttpInterceptor,loaderInterceptor,errorHandlerInterceptor])),
    provideAnimationsAsync(),

  ]
};
