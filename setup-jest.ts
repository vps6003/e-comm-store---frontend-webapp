// setup-jest.ts
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';
setupZonelessTestEnv();

import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(), // ✅ fixes HttpClient injection everywhere
      provideRouter([]), // ✅ fixes routerLink + Router dependencies

      // ✅ fixes ActivatedRoute injection
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({}),
          queryParams: of({}),
          snapshot: {
            paramMap: { get: () => null },
            queryParamMap: { get: () => null },
          },
        },
      },
    ],
  });
});
