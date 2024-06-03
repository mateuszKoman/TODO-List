import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { addListID, changeListID } from 'app/common/generics/generic-list/list-ids-service/state/listID-action';
import { selectAllListIDs } from 'app/common/generics/generic-list/list-ids-service/state/listID-selectors';

@Injectable({
  providedIn: 'root'
})
export class ListIdsService {

  constructor(
    private readonly store: Store<{ listIDs: string[] }>
  ) {
  }

  generateListID(listID: string): string {
    this.store.dispatch(addListID({ listID }));
    return listID;
  }

  changeListID(previousListID: string, currentListID: string): string {
    this.store.dispatch(changeListID({ previousListID, currentListID }))
    return currentListID;
  }

  getAllListID(): Observable<Array<string>> {
    return this.store.select(selectAllListIDs);
  }
}
