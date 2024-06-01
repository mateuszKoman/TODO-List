import { TestBed } from '@angular/core/testing';

import { ListIdsService } from 'app/common/generics/generic-list/list-ids-service/list-ids.service';

describe('ListIDsServiceService', () => {
  let service: ListIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
