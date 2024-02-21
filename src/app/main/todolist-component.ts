import { Component, OnDestroy } from '@angular/core';
import { TaskListComponent } from '../task-list/task-list-component';
import { LargeButtonComponent } from '../large-button/large-button.component';
import { HeaderComponent } from './../header/header.component';
import { ThemeModeSwitcherComponent } from '../theme-mode-switcher/theme-mode-switcher.component';
import { NgClass } from '@angular/common';
import { ThemeService } from '../theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { AddTaskComponent } from './../add-task/add-task.component';
import { BacklogComponent } from './../backlog/backlog.component';
import { MiddleComponent } from './../middle/middle.component';
import { ToDoListComponent } from './../to-do-list/to-do-list.component';

@Component({
  selector: 'todolist',
  standalone: true,
  imports: [
    TaskListComponent,
    LargeButtonComponent,
    HeaderComponent,
    ThemeModeSwitcherComponent,
    NgClass,
    AddTaskComponent,
    BacklogComponent,
    MiddleComponent,
    ToDoListComponent
  ],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TODOListComponent implements OnDestroy {
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
