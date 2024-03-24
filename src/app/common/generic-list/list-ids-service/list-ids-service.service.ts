import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import { Task } from 'app/common/task/task';
import { TaskStatus } from 'app/common/task/taskStatus';

@Injectable({
  providedIn: 'root'
})
export class ListIDsServiceService {

  private _listIDs = new BehaviorSubject<Array<string>>(['backlog', 'todolist']);
  listIDs$ = this._listIDs.asObservable()

  constructor() {
  }

  private updateListIDs(newLitsIDs: string[]) {
    this._listIDs.next(newLitsIDs);
  }

  getListIDs(): Observable<Array<string>> {
    return this.listIDs$;
  }


  addIDtoListID(id: string) {
    this.listIDs$.pipe(
      take(1)
    ).subscribe(listIDs => {
      this.updateListIDs([...listIDs, id]);
    });
  }

  swapID(previousID: string, newID: string) {
    this.listIDs$.pipe(
      take(1)
    ).subscribe(listIDs => {
      const indexOfID = listIDs.findIndex(id => id === previousID);
      if (indexOfID !== -1) {
        listIDs[indexOfID] = newID;
      }
    });
  }

}
