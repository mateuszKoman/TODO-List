import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GenericListNameService {

  private _listName = new Subject<string>();
  listName$ = this._listName.asObservable();

  updateListName(listName: string): void {
    this._listName.next(listName)
  }
}
