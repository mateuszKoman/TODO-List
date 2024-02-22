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
    this.selectedItems.forEach(selectedTask => {
      this.todolist.push(selectedTask);
      for (let i = 0; i < this.addTaskService.backlogTasks.length; i++) {
        if (this.selectedItems.includes(this.addTaskService.backlogTasks[i])) {
          this.addTaskService.backlogTasks.splice(i, 1);
          i--;
        }
      }
    });
    this.updateToDoList();
    this.selectedItems = [];
  }

  revertToBacklog(): void {
    this.selectedItems.forEach(selectedTask => {
      this.addTaskService.backlogTasks.push(selectedTask);
      for (let i = 0; i < this.todolist.length; i++) {
        if (this.selectedItems.includes(this.todolist[i])) {
          this.todolist.splice(i, 1);
          i--;
        }
      }
    });
    this.updateBacklog();
    this.updateToDoList();
    this.selectedItems = [];
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
