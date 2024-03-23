import { Component, DestroyRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from 'app/common/task/task';
import { StorageService } from 'app/common/task-list/storage-service/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from 'app/common/task/taskStatus';

@Component({
  selector: 'add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnDestroy {

  isDarkMode: boolean = false;
  private themeSubscription: Subscription;
  newTask = new Task('', '', TaskStatus.DONE);

  constructor(private themeService: ThemeService,
              private readonly storageService: StorageService,
              private destroyRef: DestroyRef) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    });
  }

  addTask(): void {
    if (this.newTask.summary !== '') {
      this.newTask.id = uuidv4();
      this.storageService.addTaskToBacklog(this.newTask);
      this.newTask = { id: '', summary: '', status: TaskStatus.TODO}
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
