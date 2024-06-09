import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from 'app/common/task/task';
import { AddNewTaskService } from 'app/common/task-list/add-new-task-service/add-new-task.service';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from 'app/common/task/taskStatus';
import { GenericButtonComponent } from 'app/common/generics/generic-button/generic-button-component';

@Component({
  selector: 'add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericButtonComponent],
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent {

  newTaskSummary!: string;

  constructor(
    private readonly storageService: AddNewTaskService
  ) {
  }

  addTask(): void {
    if (this.newTaskSummary !== '') {
      const newTask = new Task(uuidv4(), this.newTaskSummary, TaskStatus.TODO, [])
      this.storageService.addTaskToBacklog(newTask);
      this.newTaskSummary = '';
    }
  }
}
