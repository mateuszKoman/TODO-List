import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  private readonly localStorageKey = 'Backlog Tasks';
  backlogTasks: string[] = [];
  constructor() { }

  getTasks(): string[] {
    return this.backlogTasks;
  }

  addTask(task: string) {
    this.backlogTasks.push(task);
    // localStorage.setItem(this.localStorageKey, JSON.stringify(this.backlogTasks));
  }

  // private getInitialBacklogTaskList(): string[] {
  //   const storedState = localStorage.getItem(this.localStorageKey);
  //   return storedState ? JSON.parse(storedState) : false;
  // }
}
