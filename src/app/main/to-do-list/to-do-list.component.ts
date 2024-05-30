import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from 'app/common/task/task';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from 'app/common/task-list/storage-service/storage.service';
import { ListIDsServiceService } from 'app/common/generics/generic-list/list-ids-service/list-ids-service.service';
import { BacklogComponent } from 'app/main/backlog/backlog.component';

@Component({
  selector: 'to-do-list',
  standalone: true,
  imports: [
    ListHeaderComponent,
    TaskListComponent,
    ThemeModeSwitcherComponent,
    FormsModule,
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    NewListButtonComponent,
    CdkDrag,
    BacklogComponent
  ],
  templateUrl: './to-do-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit {

  isDarkMode: boolean = true;
  toDoList!: Array<Task>;
  listIDs!: Array<string>;

  constructor(
    private destroyRef: DestroyRef,
    private readonly storageService: StorageService,
    private readonly listIDsServiceService: ListIDsServiceService
  ) {
  }

  ngOnInit(): void {
    this.observeTODOList();
    this.observeListIDs();
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.storageService.drop(event);
  }

  observeTODOList() {
    this.storageService.getTODOList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(todolist => {
      this.toDoList = todolist;
    });
  }

  observeListIDs() {
    this.listIDsServiceService.getListIDs().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(listIDs => {
      this.listIDs = listIDs;
    });
  }
}
