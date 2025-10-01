import { TestBed } from '@angular/core/testing';

import { CustomerServices } from './customer-services';

describe('CustomerServices', () => {
  let service: CustomerServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
