import { Component, DestroyRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskListComponent } from '../common/task-list/task-list-component';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { ThemeModeSwitcherComponent } from '../common/theme-mode-switcher/theme-mode-switcher.component';
import { NgClass } from '@angular/common';
import { ThemeService } from '../common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { ToDoListComponent } from 'app/main/to-do-list/to-do-list.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AppHeaderComponent } from 'app/main/header/header-component/app-header.component';
import { GenericList } from 'app/common/generic-list/generic-list.component';
import { Task } from 'app/common/task/task';
import { TaskStatus } from 'app/common/task/taskStatus';
import { EditModalComponent } from 'app/common/task/task-card/edit-task/edit-modal/edit-modal.component';
import { ListIDsServiceService } from 'app/common/generic-list/list-ids-service/list-ids-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    EditModalComponent,
    CdkDrag,
    CdkDropList
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

  constructor(private themeService: ThemeService,
              private readonly listIDsServiceService: ListIDsServiceService,
              private readonly destroyRef: DestroyRef) {
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
    listComponentRef.instance.id = `list-${this.componentCounter}`;
    listComponentRef.instance.listName = `list-${this.componentCounter}`;
    this.listIDsServiceService.addIDtoListID(listComponentRef.instance.listName);
  }

  drop(event: CdkDragDrop<any[], any>) {
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.item., event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer,
    //     event.container,
    //     event.previousIndex,
    //     event.currentIndex);
    //
    //   const taskToMove = event.container.data[event.currentIndex];
    //   // const previousIndex = event.previousContainer.data.findIndex(task => task.id === taskToMove.id);
    //   // event.previousContainer.data.filter(task => task.id !== taskToMove.id);
    // }
  }
}
