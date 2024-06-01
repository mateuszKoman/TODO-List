import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction(
  '[Theme] Set Dark Mode',
  props<{ isDarkMode: boolean }>()
);

export const loadDarkMode = createAction('[Theme] Load Dark Mode');
export const loadDarkModeSucces = createAction(
  '[Theme] Load Dark Mode Success',
  props<{ isDarkMode: boolean }>()
)
