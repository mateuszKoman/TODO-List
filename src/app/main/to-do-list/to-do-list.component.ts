import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { ListsActionHandlerService } from 'app/common/lists-action-handler/lists-action-handler.service';
import { Task } from 'app/common/task/task';
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NewListComponent } from 'app/common/new-list/new-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    NewListComponent
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit, OnDestroy {
  @Input()
  listName!: string;

  isDarkMode: boolean = false;
  toDoList: Array<Task> = [];
  private ToDoListSubscription?: Subscription;

  constructor(private themeService: ThemeService,
              private listActionHandler: ListsActionHandlerService,
              private changeDetectorRef: ChangeDetectorRef,
              private destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this.observeToDoList();
    this.observeThemeMode();
  }

  ngOnDestroy(): void {
    if (this.ToDoListSubscription) {
      this.ToDoListSubscription.unsubscribe();
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.listActionHandler.addToToDoList(event.item.data);
  }

  private observeToDoList(): void {
    this.ToDoListSubscription = this.listActionHandler.getToDoList()
                                    .subscribe((list: Array<Task>) => {
                                      this.toDoList = list;
                                      this.changeDetectorRef.detectChanges();
                                    });
  }

  observeThemeMode(): void {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((isDarkModeON: boolean) => {
      this.isDarkMode = isDarkModeON;
    });
  }
}
