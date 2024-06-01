import { TestBed } from '@angular/core/testing';

import { TaskPositionService } from 'app/common/task-list/task-position-service/task-position.service';

describe('TaskListPositionService', () => {
  let service: TaskPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
