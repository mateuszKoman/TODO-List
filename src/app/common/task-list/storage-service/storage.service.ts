import { Injectable } from '@angular/core';
import { Task } from 'app/common/task/task';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { TaskStatus } from 'app/common/task/taskStatus';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _backlog = new BehaviorSubject<Task[]>([new Task('lala', 'first task', TaskStatus.TODO, [])]);
  backlog$ = this._backlog.asObservable();

  private _todolist = new BehaviorSubject<Task[]>([]);
  todolist$  = this._todolist.asObservable();

  constructor() {
  }

  getBacklog(): Observable<Array<Task>> {
    return this.backlog$;
  }

  updateBacklog(newBacklog: Task[]) {
    this._backlog.next(newBacklog);
  }

  addTaskToBacklog(task: Task) {
    this.backlog$.pipe(
      take(1)
    ).subscribe(backlog => {
      this.updateBacklog([...backlog, task]);
    });
  }

  getTODOList(): Observable<Array<Task>> {
    return this.todolist$;
  }
}

