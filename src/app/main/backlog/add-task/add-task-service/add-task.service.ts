import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'app/common/task/task';
import { v4 as uuidv4 } from 'uuid';



@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  private readonly localStorageKey = 'Backlog Tasks';
  backlogTasks: Array<Task> = [];
  constructor() { }

  getTasks(): Array<Task> {
    return this.backlogTasks;
  }

  addTask(summary: string) {
    this.backlogTasks.push(new Task(uuidv4(), summary));
    // localStorage.setItem(this.localStorageKey, JSON.stringify(this.backlogTasks));
  }

  // private getInitialBacklogTaskList(): string[] {
  //   const storedState = localStorage.getItem(this.localStorageKey);
  //   return storedState ? JSON.parse(storedState) : false;
  // }
}
