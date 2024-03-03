import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'theme-mode-switcher',
  standalone: true,
  templateUrl: './theme-mode-switcher.component.html',
  styleUrl: './theme-mode-switcher.component.css'
})
export class ThemeModeSwitcherComponent implements OnDestroy {
  isDarkMode: boolean = false;
  private themeSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  toggleTheme() {
    // Przełącz tryb ciemny
    this.themeService.setDarkMode(!this.isDarkMode);
  }
}
