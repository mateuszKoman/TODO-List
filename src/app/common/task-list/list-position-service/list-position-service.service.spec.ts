import { TestBed } from '@angular/core/testing';

import { ListPositionService } from 'app/common/task-list/list-position-service/list-position.service';

describe('ListPositionServiceService', () => {
  let service: ListPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
