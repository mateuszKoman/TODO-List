import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { darkModeStorageKey } from 'app/common/theme-mode/theme-service/theme.service';
import * as ThemeActions from './theme-action';
import { of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeEffects {
  constructor(
    private readonly actions$: Actions
  ) {
  }

  loadDarkMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeActions.loadDarkMode),
      switchMap(() => {
        const storedState = localStorage.getItem(darkModeStorageKey);
        const isDarkMode = storedState ? JSON.parse(storedState) : false;
        return of(ThemeActions.loadDarkModeSucces({ isDarkMode }))
      })
    ));
}
