import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { AddTaskService } from 'app/main/backlog/add-task/add-task-service/add-task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from 'app/common/task/task';

@Component({
  selector: 'add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnDestroy {

  isDarkMode: boolean = false;
  private themeSubscription: Subscription;
  newTaskSummary!: string;

  @Output()
  taskEmitter: EventEmitter<Array<Task>> = new EventEmitter<Array<Task>>();

  constructor(private themeService: ThemeService,
              private addTaskService: AddTaskService) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  addTask(): void {
    if (this.newTaskSummary !== '') {
      this.addTaskService.addTask(this.newTaskSummary);
      this.taskEmitter.emit();
      this.newTaskSummary = '';
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
