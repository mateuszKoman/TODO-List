import { Injectable } from '@angular/core';
import { AddTaskService } from 'app/main/backlog/add-task/add-task-service/add-task.service';
import { Observable, Subject } from 'rxjs';
import { Task } from 'app/common/task/task';

@Injectable({
  providedIn: 'any'
})
export class ListsActionHandlerService {
  private selectedItems: Array<Task> = [];

  private todolist: Array<Task> = [];
  private todolistSubject = new Subject<Array<Task>>();

  private backlog: Array<Task> = [];
  private backlogSubject = new Subject<Array<Task>>();


  constructor(private addTaskService: AddTaskService) {
    this.backlog = addTaskService.backlogTasks;
  }

  addToToDoList(): void {
    let idsToRemove: string[] = this.selectedItems.map(task => task.id);

    this.todolist.push(...this.selectedItems);

    this.backlog = this.backlog.filter(task => {
      return !idsToRemove.includes(task.id);
    });

    this.selectedItems = [];

    this.updateToDoList();
    this.updateBacklog();
  }



  revertToBacklog(): void {
    let indexesToRemove: number[] = [];

    this.selectedItems.forEach(selectedTask => {
      this.backlog.push(selectedTask);
      for (let i = 0; i < this.todolist.length; i++) {
        if (this.todolist[i] === selectedTask) {
          indexesToRemove.push(i);
        }
      }
    });

    for (let i = indexesToRemove.length - 1; i >= 0; i--) {
      this.todolist.splice(indexesToRemove[i], 1);
    }

    this.selectedItems = [];
    this.updateBacklog();
    this.updateToDoList();
  }


  toggleSelection(task: Task): void {
    if (this.isSelected(task)) {
      this.selectedItems = this.selectedItems.filter(value => value.id !== task.id);
    } else {
      this.selectedItems.push(task);
    }
  }

  isSelected(task: Task): boolean {
    return this.selectedItems.some(selectedTask => selectedTask.id === task.id);
  }

  private updateToDoList() {
    this.todolistSubject.next(this.todolist);
  }

  getToDoList(): Observable<Array<Task>> {
    return this.todolistSubject.asObservable();
  }

  private updateBacklog() {
    this.backlogSubject.next(this.backlog);
  }

  getBacklog(): Observable<Array<Task>> {
    return this.backlogSubject.asObservable();
  }
}
