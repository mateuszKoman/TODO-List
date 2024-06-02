import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  generateListID(id: string): string {
    this.listIDs.push(id);
    this.updateListIDs(this.listIDs);
    return id;
  }

  getAllListID(): Observable<Array<string>> {
    return this.listIDs$;
  }
}
