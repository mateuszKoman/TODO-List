import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './../task-card/task-card.component';
import { ThemeService } from '../theme-mode-switcher/theme-service/theme.service';
import { Subscription } from 'rxjs';
import { ListsActionHandlerService } from './../middle/lists-action-handler/lists-action-handler.service';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnDestroy {

  @Input()
  listOfTasks: string[] = [];

  isDarkMode: boolean = false;
  private themeSubscription: Subscription;

  constructor(private themeService: ThemeService, private listsActionHandler: ListsActionHandlerService) {
    this.themeSubscription = this.themeService.isDarkMode()
                                 .subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    })
  }

  isSelected(task: string): boolean {
    return this.listsActionHandler.isSelected(task);
  }

  toggleSelection(task: string): void {
    this.listsActionHandler.toggleSelection(task);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}