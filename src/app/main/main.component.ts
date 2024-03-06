import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskListComponent } from '../common/task-list/task-list-component';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { ThemeModeSwitcherComponent } from '../common/theme-mode-switcher/theme-mode-switcher.component';
import { NgClass } from '@angular/common';
import { ThemeService } from '../common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { AddTaskComponent } from 'app/main/backlog/add-task/add-task.component';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { MiddleComponent } from 'app/main/middle/middle.component';
import { ToDoListComponent } from 'app/main/to-do-list/to-do-list.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AppHeaderComponent } from 'app/main/header/header-component/app-header.component';

@Component({
  selector: 'todolist',
  standalone: true,
  imports: [
    TaskListComponent,
    ListHeaderComponent,
    ThemeModeSwitcherComponent,
    NgClass,
    AddTaskComponent,
    BacklogComponent,
    MiddleComponent,
    ToDoListComponent,
    CdkDropListGroup,
    AppHeaderComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  isDarkMode: boolean = false;
  private themeSubscription: Subscription;
  private componentCounter: number = 0;

  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  createList() {
    this.componentCounter++;

    const listComponentRef = this.container.createComponent(ToDoListComponent);
    const listComponentInstance = listComponentRef.instance as ToDoListComponent;

    listComponentInstance.listName = 'Daily';

    listComponentRef.location.nativeElement.id = `component-${this.componentCounter}`;
    listComponentRef.location.nativeElement.classList.add('dynamic-component');

    listComponentRef.location.nativeElement.style.minWidth = '600px';
    listComponentRef.location.nativeElement.style.minHeight = '800px';
  }
}
