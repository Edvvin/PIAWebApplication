import { TestBed } from '@angular/core/testing';

import { EstateServiceService } from './estate-service.service';

describe('EstateServiceService', () => {
  let service: EstateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
