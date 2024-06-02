import { ChangeDetectorRef, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from 'app/common/task/task-card/task-card.component';
import { Task } from 'app/common/task/task';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskStatus } from 'app/common/task/taskStatus';
import { EditTaskService } from 'app/common/task/edit-task/edit-modal/edit-task-service/edit-task.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  @Input()
  listOfTasks: Task[] = [];

  protected readonly TaskStatus = TaskStatus;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    private readonly editTaskService: EditTaskService
  ) {
  }

  ngOnInit(): void {
    this.observeUpdatedTask()
  }

  observeUpdatedTask(): void {
    this.editTaskService.task$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(updatedTask => {
      const index = this.listOfTasks.findIndex(task => task.id === updatedTask.id);
      this.listOfTasks[index] = updatedTask;
      this.changeDetectorRef.detectChanges();
    });
  }
}
