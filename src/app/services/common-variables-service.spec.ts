import { TestBed } from '@angular/core/testing';

import { CommonVariablesService } from './common-variables-service';

describe('CommonVariablesService', () => {
  let service: CommonVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
