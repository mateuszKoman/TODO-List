import { Component, OnDestroy } from '@angular/core';
import { TaskListComponent } from '../common/task-list/task-list-component';
import { HeaderComponent } from 'app/common/header/header.component';
import { ThemeModeSwitcherComponent } from '../common/theme-mode-switcher/theme-mode-switcher.component';
import { NgClass } from '@angular/common';
import { ThemeService } from '../common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { AddTaskComponent } from 'app/main/backlog/add-task/add-task.component';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { MiddleComponent } from 'app/main/middle/middle.component';
import { ToDoListComponent } from 'app/main/to-do-list/to-do-list.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'todolist',
  standalone: true,
  imports: [
    TaskListComponent,
    HeaderComponent,
    ThemeModeSwitcherComponent,
    NgClass,
    AddTaskComponent,
    BacklogComponent,
    MiddleComponent,
    ToDoListComponent,
    CdkDropListGroup
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy {
  isDarkMode: boolean = false;
  private themeSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
