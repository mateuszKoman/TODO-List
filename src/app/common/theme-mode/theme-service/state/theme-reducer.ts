import { Action, createReducer, on } from '@ngrx/store';
import * as ThemeActions from './theme-action';

export interface ThemeState {
  isDarkMode: boolean
}

export const initialState: ThemeState = {
  isDarkMode: false
}

const themeReducer =  createReducer(
  initialState,
  on(ThemeActions.setDarkMode, (state, { isDarkMode }) => ({ ...state, isDarkMode })),
  on(ThemeActions.loadDarkModeSucces, (state, { isDarkMode }) => ({ ...state, isDarkMode }))
)

export function reducer(state: ThemeState | undefined, action: Action) {
  return themeReducer(state, action);
}
