import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { AddTaskComponent } from 'app/main/backlog/add-task/add-task.component';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { Task } from 'app/common/task/task';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StorageService } from 'app/common/task-list/storage-service/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnDestroy, OnInit {
  isDarkMode: boolean = false;
  private themeSubscription?: Subscription;

  backlogTasks!: Array<Task>;

  constructor(private themeService: ThemeService,
              private readonly storageService: StorageService,
              private destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
    this.observeBacklog();
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  private observeBacklog(): void {
    this.storageService.getBacklog().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(backlog => {
      this.backlogTasks = backlog;
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.storageService.addTaskToBacklog(event.item.data);
    this.storageService.removeTaskFromTODOList(event.item.data);
  }
}
