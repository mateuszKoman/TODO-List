import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskListComponent } from '../common/task-list/task-list-component';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { ThemeModeSwitcherComponent } from '../common/theme-mode-switcher/theme-mode-switcher.component';
import { NgClass } from '@angular/common';
import { ThemeService } from '../common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { ToDoListComponent } from 'app/main/to-do-list/to-do-list.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AppHeaderComponent } from 'app/main/header/header-component/app-header.component';
import { GenericList } from 'app/common/generic-list/generic-list.component';
import { Task } from 'app/common/task/task';
import { TaskStatus } from 'app/common/task/taskStatus';
import { EditModalComponent } from 'app/common/task/task-card/edit-task/edit-modal/edit-modal.component';

@Component({
  selector: 'todolist',
  standalone: true,
  imports: [
    TaskListComponent,
    ListHeaderComponent,
    ThemeModeSwitcherComponent,
    NgClass,
    BacklogComponent,
    ToDoListComponent,
    CdkDropListGroup,
    AppHeaderComponent,
    EditModalComponent
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
    const listComponentRef = this.container.createComponent(GenericList);
    listComponentRef.location.nativeElement.id = `component-${this.componentCounter}`;
    listComponentRef.location.nativeElement.classList.add('dynamic-component');
    listComponentRef.location.nativeElement.style.minWidth = '600px';
    listComponentRef.location.nativeElement.style.minHeight = '1000px';
    listComponentRef.instance.id = `generic-task-list-${this.componentCounter}`
    listComponentRef.instance.genericList = [new Task('ddfverwv', 'fewqfewfqwe', TaskStatus.INPROGRESS, [])];

  }
}
