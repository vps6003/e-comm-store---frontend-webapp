import { TestBed } from '@angular/core/testing';

import { AuthServices } from './auth-services';

describe('AuthServices', () => {
  let service: AuthServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
