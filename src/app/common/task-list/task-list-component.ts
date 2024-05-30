import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from 'app/common/task/task-card/task-card.component';
import { Task } from 'app/common/task/task';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskStatus } from 'app/common/task/taskStatus';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  @Input()
  listOfTasks: Task[] = [];

  protected readonly TaskStatus = TaskStatus;
}
