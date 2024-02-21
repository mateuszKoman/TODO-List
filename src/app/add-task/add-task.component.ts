import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './../theme-mode-switcher/theme-service/theme.service';
import { AddTaskService } from './add-task-service/add-task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  newTask: string = '';

  @Output()
  taskEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService,
              private addTaskService: AddTaskService) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  addTask(): void {
    if (this.newTask !== '') {
      this.addTaskService.addTask(this.newTask);
      this.taskEmitter.emit();
      this.newTask = '';
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
