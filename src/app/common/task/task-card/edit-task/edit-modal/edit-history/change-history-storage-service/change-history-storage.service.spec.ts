import { TestBed } from '@angular/core/testing';

import { ChangeHistoryStorageService } from './change-history-storage.service';

describe('ChangeHistoryStorageService', () => {
  let service: ChangeHistoryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeHistoryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
