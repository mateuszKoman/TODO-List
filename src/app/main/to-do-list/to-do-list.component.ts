import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from 'app/common/header/header.component';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode-switcher/theme-mode-switcher.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { ListsActionHandlerService } from 'app/common/lists-action-handler/lists-action-handler.service';
import { Task } from 'app/common/task/task';
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';

@Component({
  selector: 'to-do-list',
  standalone: true,
  imports: [
    HeaderComponent,
    TaskListComponent,
    ThemeModeSwitcherComponent,
    FormsModule,
    CommonModule,
    CdkDropListGroup,
    CdkDropList
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements OnInit, OnDestroy {
  isDarkMode: boolean = false;
  private themeSubscription: Subscription;
  toDoList: Array<Task> = [];
  private ToDoListSubscription?: Subscription;


  constructor(private themeService: ThemeService,
              private listActionHandler: ListsActionHandlerService,
              private changeDetectorRef: ChangeDetectorRef
  ) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  ngOnInit(): void {
    this.observeToDoList();
  }

  ngOnDestroy(): void {
    if (this.ToDoListSubscription) {
      this.ToDoListSubscription.unsubscribe();
    }
  }

  private observeToDoList(): void {
    this.ToDoListSubscription = this.listActionHandler.getToDoList()
                                    .subscribe((list: Array<Task>) => {
                                      this.toDoList = list;
                                      this.changeDetectorRef.detectChanges();
                                    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.listActionHandler.addToToDoList(event.item.data)
  }
}
