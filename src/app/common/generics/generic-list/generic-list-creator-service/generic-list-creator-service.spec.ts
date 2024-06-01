import { TestBed } from '@angular/core/testing';

import { GenericListCreatorService } from 'app/common/generics/generic-list/generic-list-creator-service/generic-list-creator.service';

describe('ListCreatorServiceService', () => {
  let service: GenericListCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericListCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
