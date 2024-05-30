import { TestBed } from '@angular/core/testing';

import { ListIDsServiceService } from 'app/common/generics/generic-list/list-ids-service/list-ids-service.service';

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
