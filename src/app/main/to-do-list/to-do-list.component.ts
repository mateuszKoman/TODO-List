import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Task } from 'app/common/task/task';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from 'app/common/task-list/storage-service/storage.service';
import { EditType } from 'app/common/task/task-card/edit-task/edit-modal/edit-history/editType';
import { EditHistory } from 'app/common/task/task-card/edit-task/edit-modal/edit-history/editHistory';
import { ListIDsServiceService } from 'app/common/generic-list/list-ids-service/list-ids-service.service';

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
    CdkDrag
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit {
  @Input()
  listName!: string;

  isDarkMode: boolean = true;
  toDoList!: Array<Task>;
  listIDs!: Array<string>;

  constructor(private themeService: ThemeService,
              private destroyRef: DestroyRef,
              private readonly storageService: StorageService,
              private readonly listIDsServiceService: ListIDsServiceService
  ) {
  }

  ngOnInit(): void {
    this.observeTODOList();
    this.observeThemeMode();
    this.observeListIDs();
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.storageService.drop(event);
  }

  observeThemeMode(): void {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((isDarkModeON: boolean) => {
      this.isDarkMode = isDarkModeON;
    });
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
