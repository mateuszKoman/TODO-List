import { Injectable } from '@angular/core';
import { Task } from 'app/common/task/task';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _backlog = new BehaviorSubject<Task[]>([]);
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
    this.backlog$.pipe(take(1)).subscribe(backlog => {
      const updatedBacklog = [...backlog, task];
      this.updateBacklog(updatedBacklog);
    });
  }

  removeTaskFromBacklog(task: Task) {
    this.backlog$.pipe(
      take(1)
    ).subscribe(value => {
      const updatedBacklog = value.filter(value => !Task.equals(value, task))
      this.updateBacklog(updatedBacklog);
    })
  }

  getTODOList(): Observable<Array<Task>> {
    return this.todolist$;
  }

  updateTODOList(newToDoList: Task[]) {
    this._todolist.next(newToDoList);
  }

  addTaskToTODOList(task: Task) {
    this.todolist$.pipe(take(1)).subscribe(todolist => {
      const updatedTODOList = [...todolist, task];
      this.updateTODOList(updatedTODOList);
    });
  }

  removeTaskFromTODOList(task: Task) {
    this.todolist$.pipe(
      take(1)
    ).subscribe(value => {
      const updatedTODOList = value.filter(value => !Task.equals(value, task))
      this.updateTODOList(updatedTODOList);
    })
  }
}

