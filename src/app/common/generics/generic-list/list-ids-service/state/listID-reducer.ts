import { createReducer, on } from '@ngrx/store';
import { addListID, changeListID } from 'app/common/generics/generic-list/list-ids-service/state/listID-action';

export const initialState: string[] = [];

const _listIDReducer = createReducer(
  initialState,
  on(addListID, (state, { listID }) => [...state, listID]),
  on(changeListID, (state, { previousListID, currentListID }) =>
    state.map(id => id === previousListID ? currentListID : id))
)

export function listIDsReducer(state: string[] = initialState, action: any ) {
  return _listIDReducer(state, action)
}
