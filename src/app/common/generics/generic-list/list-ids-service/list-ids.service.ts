import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ListIdsService {

  private listIDs: Array<string> = [];

  private _listIDs = new BehaviorSubject<Array<string>>([]);
  private listIDs$ = this._listIDs.asObservable()


  private updateListIDs(newLitsIDs: string[]) {
    this._listIDs.next(newLitsIDs);
  }

  generateListID(): string {
    const id = uuidv4();

    this.listIDs.push(id);
    this.updateListIDs(this.listIDs);
    return id;
  }

  getAllListID(): Observable<Array<string>> {
    return this.listIDs$;
  }
}
