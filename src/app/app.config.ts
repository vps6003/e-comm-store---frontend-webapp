import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { tokenHttpInterceptor } from './core/interceptors/token-auth-interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';

// ✅ Angular Material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// ✅ Custom Directives
import { TooltipModule } from './core/directives/mat-tooltip.module';
import { BadgeModule } from './core/directives/mat-badge.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([tokenHttpInterceptor, loaderInterceptor, errorHandlerInterceptor])
    ),
    importProvidersFrom(
      MatTooltipModule,
      MatBadgeModule,
      MatIconModule,
      MatButtonModule,
      TooltipModule,
      BadgeModule
    ),

    // ✅ Root NgRx setup — no feature slices or effects here
    provideStore(),
    provideEffects(),

    // ✅ DevTools
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
