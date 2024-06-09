import { TestBed } from '@angular/core/testing';

import { AddNewTaskService } from 'app/common/task-list/add-new-task-service/add-new-task.service';

describe('StorageServiceService', () => {
  let service: AddNewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
