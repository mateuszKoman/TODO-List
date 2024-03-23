import { TestBed } from '@angular/core/testing';

import { ChangeHistoryStorageService } from 'app/common/task/task-card/edit-task/edit-modal/edit-history/change-history-storage-service/change-history-storage.service';

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
