import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectListIDsState = createFeatureSelector<string[]>('listIDs');

export const selectAllListIDs = createSelector(
  selectListIDsState,
  (state: string[]) => state
)
