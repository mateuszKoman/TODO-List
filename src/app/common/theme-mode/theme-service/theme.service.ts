import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ThemeActions from './theme-state/theme-action';
import { selectIsDarkMode } from './theme-state/theme-selectors';
import { Observable } from 'rxjs';

export const darkModeStorageKey = 'isDarkMode';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor(
    private readonly store: Store,
  ) {
    this.initializeTheme()
  }

  private initializeTheme(): void {
    this.store.dispatch(ThemeActions.loadDarkMode());
  }

  setDarkMode(isDarkMode: boolean): void {
    this.store.dispatch(ThemeActions.setDarkMode({ isDarkMode }));
    localStorage.setItem(darkModeStorageKey, JSON.stringify(isDarkMode));
  }

  getDarkMode(): Observable<boolean> {
    return this.store.select(selectIsDarkMode);
  }
}
