import { TestBed } from '@angular/core/testing';

import { ListIDsServiceService } from './list-ids-service.service';

describe('ListIDsServiceService', () => {
  let service: ListIDsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListIDsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
