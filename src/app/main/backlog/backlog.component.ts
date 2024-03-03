import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TaskListComponent } from 'app/common/task-list/task-list-component';
import { AddTaskComponent } from 'app/main/backlog/add-task/add-task.component';
import { HeaderComponent } from 'app/common/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { AddTaskService } from 'app/main/backlog/add-task/add-task-service/add-task.service';
import { ListsActionHandlerService } from 'app/main/middle/lists-action-handler/lists-action-handler.service';
import { Task } from 'app/common/task/task';

@Component({
  selector: 'backlog',
  standalone: true,
  imports: [
    TaskListComponent,
    AddTaskComponent,
    HeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnDestroy, OnInit {
  isDarkMode: boolean = false;
  private themeSubscription?: Subscription;

  backlogTasks: Array<Task> = this.addTaskService.getTasks();
  private backlogSubscription?: Subscription;

  constructor(private themeService: ThemeService,
              private addTaskService: AddTaskService,
              private listsActionHandler: ListsActionHandlerService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
    this.observeBacklog()
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    if (this.backlogSubscription) {
      this.backlogSubscription.unsubscribe();
    }
  }

  private observeBacklog(): void {
    this.backlogSubscription = this.listsActionHandler.getBacklog()
                                   .subscribe((list: Array<Task>) => {
                                     this.backlogTasks = list;
                                     this.changeDetectorRef.detectChanges();
                                   });
  }
}