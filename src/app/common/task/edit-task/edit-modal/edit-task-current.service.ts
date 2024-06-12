import { Injectable } from '@angular/core';
import { Task } from '../../task';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditTaskCurrentService {
  private currentTask!: Task;

  setCurrentTask(task: Task) {
    this.currentTask = task;
  }

  getCurrentTask(): Observable<Task> {
    return of(this.currentTask);
  }
}
