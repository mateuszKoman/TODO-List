import { Injectable } from '@angular/core';
import { Task } from 'app/common/task/task';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { TaskStatus } from 'app/common/task/taskStatus';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditHistory } from 'app/common/task/edit-task/edit-modal/edit-history/editHistory';
import { EditType } from 'app/common/task/edit-task/edit-modal/edit-history/editType';

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

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      event.previousContainer.data.filter(task => task.id !== event.container.data[event.currentIndex].id)
      event.item.data.editHistory.push(new EditHistory(new Date(), EditType.REPLANNED, event.previousContainer.id, event.container.id ));
    }
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

