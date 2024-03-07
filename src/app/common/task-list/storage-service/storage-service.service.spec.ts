import { TestBed } from '@angular/core/testing';

import { StorageService } from 'app/common/task-list/storage-service/storage.service';

describe('StorageServiceService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
