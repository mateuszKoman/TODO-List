import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditButtonComponent } from 'app/common/task/task-card/edit-task/edit-button/edit-button.component';
import { Task } from 'app/common/task/task';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [CommonModule, EditButtonComponent],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {

  @Input()
  task!: Task
}
