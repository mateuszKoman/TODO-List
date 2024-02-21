import { TestBed } from '@angular/core/testing';

import { ListsActionHandlerService } from 'src/app/middle/lists-action-handler/lists-action-handler.service';

describe('ListsActionHandlerService', () => {
  let service: ListsActionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsActionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
