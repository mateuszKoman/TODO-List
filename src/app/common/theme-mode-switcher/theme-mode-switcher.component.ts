import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'theme-mode-switcher',
  standalone: true,
  templateUrl: './theme-mode-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeModeSwitcherComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(
    private readonly themeService: ThemeService,
    private readonly destroyRef: DestroyRef,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.observeIsDarkMode()
  }

  toggleTheme() {
    this.themeService.setDarkMode(!this.isDarkMode);
  }

  private observeIsDarkMode() {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
      this.changeDetectorRef.detectChanges()
    })
  }
}
