import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, RendererFactory2 } from '@angular/core';
import { ThemeService } from 'app/common/theme-mode/theme-service/theme.service';
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
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly rendererFactory2: RendererFactory2
  ) {
  }

  ngOnInit() {
    this.observeIsDarkMode()
  }

  toggleTheme() {
    this.themeService.setDarkMode(!this.isDarkMode);
  }

  private updateHtmlRootTheme(isDarkMode: boolean): void {
    const renderer = this.rendererFactory2.createRenderer(null, null);
    const htmlElement = renderer.selectRootElement('html', true);

    if (isDarkMode) {
      renderer.setAttribute(htmlElement, 'theme-mode', 'dark');
    } else {
      renderer.removeAttribute(htmlElement, 'theme-mode');
    }
  }

  private observeIsDarkMode() {
    this.themeService.getDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef))
        .subscribe(isDarkMode => {
          this.isDarkMode = isDarkMode;
          this.updateHtmlRootTheme(this.isDarkMode);
          this.changeDetectorRef.detectChanges();
    })
  }
}
