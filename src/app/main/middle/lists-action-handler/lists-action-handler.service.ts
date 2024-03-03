import { Injectable } from '@angular/core';
import { AddTaskService } from 'app/main/backlog/add-task/add-task-service/add-task.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ListsActionHandlerService {
  private selectedItems: string[] = [];

  private todolist: string[] = [];
  private todolistSubject = new Subject<string[]>();

  private backlog: string[] = [];
  private backlogSubject = new Subject<string[]>();


  constructor(private addTaskService: AddTaskService) {
    this.backlog = addTaskService.backlogTasks;
  }

  addToToDoList(): void {
    let indexesToRemove: number[] = [];

    this.selectedItems.forEach(selectedTask => {
      this.todolist.push(selectedTask);
      for (let i = 0; i < this.backlog.length; i++) {
        if (this.backlog[i] === selectedTask) {
          indexesToRemove.push(i);
        }
      }
    });

    for (let i = indexesToRemove.length - 1; i >= 0; i--) {
      this.backlog.splice(indexesToRemove[i], 1);
    }

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



  toggleSelection(task: string): void {
    if (this.isSelected(task)) {
      this.selectedItems = this.selectedItems.filter(value => value !== task);
    } else {
      this.selectedItems.push(task);
    }
  }

  isSelected(task: string): boolean {
    return this.selectedItems.includes(task);
  }

  private updateToDoList() {
    this.todolistSubject.next(this.todolist);
  }

  getToDoList(): Observable<string[]> {
    return this.todolistSubject.asObservable();
  }

  private updateBacklog() {
    this.backlogSubject.next(this.backlog);
  }

  getBacklog(): Observable<string[]> {
    return this.backlogSubject.asObservable();
  }
}
