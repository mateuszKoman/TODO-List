import { createAction, props } from '@ngrx/store';

export const addListID = createAction(
  '[List ID] Add List ID',
  props<{ listID: string }>()
);

export const changeListID = createAction(
  '[List ID] Change List ID',
  props<{ previousListID: string, currentListID: string }>()
);
