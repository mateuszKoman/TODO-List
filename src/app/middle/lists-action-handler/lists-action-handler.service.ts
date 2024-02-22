import { Injectable } from '@angular/core';
import { AddTaskService } from './../../add-task/add-task-service/add-task.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ListsActionHandlerService {
  selectedItems: string[] = [];

  todolist: string[] = [];
  private todolistSubject = new Subject<string[]>();

  backlog: string[] = [];
  private backlogSubject = new Subject<string[]>();


  constructor(private addTaskService: AddTaskService) {
  }

  addToToDoList(): void {
    let indexesToRemove: number[] = [];

    this.selectedItems.forEach(selectedTask => {
      this.todolist.push(selectedTask);
      for (let i = 0; i < this.addTaskService.backlogTasks.length; i++) {
        if (this.addTaskService.backlogTasks[i] === selectedTask) {
          indexesToRemove.push(i);
        }
      }
    });

    for (let i = indexesToRemove.length - 1; i >= 0; i--) {
      this.addTaskService.backlogTasks.splice(indexesToRemove[i], 1);
    }

    this.selectedItems = [];
    this.updateToDoList();
    this.updateBacklog();
  }

  revertToBacklog(): void {
    let indexesToRemove: number[] = [];

    this.selectedItems.forEach(selectedTask => {
      this.addTaskService.backlogTasks.push(selectedTask);
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
