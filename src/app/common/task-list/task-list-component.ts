import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from 'app/common/task/task-card/task-card.component';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { ListsActionHandlerService } from 'app/common/lists-action-handler/lists-action-handler.service';
import { Task } from 'app/common/task/task';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnDestroy {

  @Input()
  listOfTasks: Task[] = [];

  isDarkMode: boolean = false;
  private themeSubscription: Subscription;

  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkMode()
                                 .subscribe((darkMode: boolean) => {
      this.isDarkMode = darkMode;
    })
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
