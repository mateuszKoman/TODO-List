import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'app/common/task/task';

@Injectable({ providedIn: 'root' })
export class EditTaskService {

  private _taskSubject = new Subject<Task>();
  task$ = this._taskSubject.asObservable();

  updateTask(task: Task): void {
    console.log('Service' + task);
    this._taskSubject.next(task);
  }
}
