import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeHistoryStorageService {

  private changeHistory: Array<Date> = [];

  constructor() { }

  getChangeHistory(): Observable<Array<Date>> {
    return of(this.changeHistory);
  }

  setChangeHistory(date: Date) {
    this.changeHistory.push(date)
  }
}
