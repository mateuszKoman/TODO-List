import { TestBed } from '@angular/core/testing';

import { ThemeService } from 'src/app/dark-mode-switcher/theme-service/theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
