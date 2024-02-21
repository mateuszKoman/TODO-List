import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskListComponent } from './../task-list/task-list-component';
import { AddTaskComponent } from './../add-task/add-task.component';
import { HeaderComponent } from './../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './../theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { AddTaskService } from './../add-task/add-task-service/add-task.service';

@Component({
  selector: 'backlog',
  standalone: true,
  imports: [
    TaskListComponent,
    AddTaskComponent,
    HeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnDestroy, OnInit {
  isDarkMode: boolean = false;
  private themeSubscription?: Subscription;
  backlogTasks: string[] = this.addTaskService.getTasks();

  constructor(private themeService: ThemeService,
              private addTaskService: AddTaskService) {
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    })
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }
}
