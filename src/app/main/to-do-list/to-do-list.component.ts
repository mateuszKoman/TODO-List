import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from 'app/common/task/task';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from 'app/common/task-list/storage-service/storage.service';
import { ListIdsService } from 'app/common/generics/generic-list/list-ids-service/list-ids.service';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { TaskPositionService } from 'app/common/task-list/task-position-service/task-position.service';

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

  toDoList!: Array<Task>;

  listIDs!: Array<string>;

  id: string = this.listIDsService.generateListID('to do list');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService,
    private readonly taskPositionService: TaskPositionService,
    private readonly listIDsService: ListIdsService
  ) {
  }

  ngOnInit(): void {
    this.observeTODOList();
    this.observeListIDs();
  }

  taskDrop(event: CdkDragDrop<Task[]>): void {
    this.taskPositionService.drop(event);
  }

  private observeTODOList() {
    this.storageService.getTODOList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(todolist => {
      this.toDoList = todolist;
      this.changeDetectorRef.detectChanges();
    });
  }

  private observeListIDs() {
    this.listIDsService.getAllListID().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(listIDs => {
      this.listIDs = listIDs;
      this.changeDetectorRef.detectChanges();
    });
  }
}
