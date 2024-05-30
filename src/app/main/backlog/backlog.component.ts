import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { AddTaskComponent } from 'app/main/backlog/add-task/add-task.component';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'app/common/task/task';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragDropModule } from '@angular/cdk/drag-drop';
import { StorageService } from 'app/common/task-list/storage-service/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskStatus } from 'app/common/task/taskStatus';
import { ListIDsServiceService } from 'app/common/generics/generic-list/list-ids-service/list-ids-service.service';

@Component({
  selector: 'backlog',
  standalone: true,
  imports: [
    TaskListComponent,
    ListHeaderComponent,
    CommonModule,
    FormsModule,
    CdkDropListGroup,
    CdkDropList,
    DragDropModule,
    CdkDrag,
    AddTaskComponent
  ],
  templateUrl: './backlog.component.html'
})
export class BacklogComponent implements OnInit {
  isDarkMode: boolean = false;
  private themeSubscription?: Subscription;

  backlogTasks!: Array<Task>;
  listIDs!: Array<string>;

  constructor(
    private readonly storageService: StorageService,
    private readonly destroyRef: DestroyRef,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly listIDsServiceService: ListIDsServiceService
  ) {
  }

  ngOnInit(): void {
    this.observeBacklog();
    this.observeListIDs();
  }

  private observeBacklog(): void {
    this.storageService.getBacklog().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(backlog => {
      this.backlogTasks = backlog;
      this.changeDetectorRef.detectChanges();
    });
  }

  observeListIDs() {
    this.listIDsServiceService.getListIDs().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(listIDs => {
      this.listIDs = listIDs;
      this.changeDetectorRef.detectChanges();
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.storageService.drop(event);
    event.item.data.status = TaskStatus.TODO;
  }
}
