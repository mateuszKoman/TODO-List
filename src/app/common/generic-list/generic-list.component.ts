import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Task } from 'app/common/task/task';
import { CdkDrag, CdkDragDrop, CdkDragExit, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GenericListHeaderComponent } from 'app/common/generic-list/generic-list-header/generic-list-header.component';
import { StorageService } from 'app/common/task-list/storage-service/storage.service';
import { ListIDsServiceService } from 'app/common/generic-list/list-ids-service/list-ids-service.service';
import { BacklogComponent } from 'app/main/backlog/backlog.component';

@Component({
  selector: 'generic-list',
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
    GenericListHeaderComponent,
    CdkDrag,
    BacklogComponent
  ],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericList implements OnInit, OnDestroy {

  listIDs!: Array<string>;

  listName!: string;
  id!: string;
  isDarkMode: boolean = false;
  genericList: Array<Task> = [];
  private ToDoListSubscription?: Subscription;

  constructor(private themeService: ThemeService,
              private destroyRef: DestroyRef,
              private readonly storageService: StorageService,
              private readonly listIDsServiceService: ListIDsServiceService
  ) {
  }

  ngOnInit(): void {
    this.observeThemeMode();
    this.observeListIDs();

    const container = document.getElementById('list-1');
    if (container) {
      container.setAttribute('cdkDropListLockAxis', 'x');
    }
  }

  ngOnDestroy(): void {
    if (this.ToDoListSubscription) {
      this.ToDoListSubscription.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.storageService.drop(event);
  }

  onListNameChange(newTitle: string) {
    this.listName = newTitle;
    this.id = this.listName;
  }

  observeThemeMode(): void {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((isDarkModeON: boolean) => {
      this.isDarkMode = isDarkModeON;
    });
  }

  observeListIDs() {
    this.listIDsServiceService.getListIDs().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(listIDs => {
      this.listIDs = listIDs;
    })
  }
}
