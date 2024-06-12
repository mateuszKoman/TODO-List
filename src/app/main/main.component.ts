import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskListComponent } from '../common/task-list/task-list-component';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode/theme-mode-switcher/theme-mode-switcher.component';
import { NgClass, NgForOf } from '@angular/common';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { ToDoListComponent } from 'app/main/to-do-list/to-do-list.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AppHeaderComponent } from 'app/main/header/header-component/app-header.component';
import { EditModalComponent } from 'app/common/task/edit-task/edit-modal/edit-modal.component';
import { ListPositionService } from 'app/common/task-list/list-position-service/list-position.service';
import { GenericListCreatorService } from 'app/common/generics/generic-list/generic-list-creator-service/generic-list-creator.service';

@Component({
  selector: 'main-component',
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
    CdkDropList,
    NgForOf
  ],
  templateUrl: './main.component.html'
})
export class MainComponent {
  @ViewChild('genericListContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  constructor(
    private readonly genericListCreatorService: GenericListCreatorService,
    private readonly listPositionService: ListPositionService,
  ) {
  }

  createGenericList() {
    this.genericListCreatorService.createGenericList(this.container);
  }

  onDragStart(event: DragEvent) {
    // this.listPositionService.onDragStart(event);
  }

  onDrop(event: DragEvent) {
    // this.listPositionService.onDrop(event);
  }

  allowDrop(event: DragEvent) {
    // this.listPositionService.allowDrop(event);
  }
}
