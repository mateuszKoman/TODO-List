import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeModeSwitcherComponent } from './theme-mode-switcher.component';

describe('DarkModeSwitcherComponent', () => {
  let component: ThemeModeSwitcherComponent;
  let fixture: ComponentFixture<ThemeModeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeModeSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeModeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
