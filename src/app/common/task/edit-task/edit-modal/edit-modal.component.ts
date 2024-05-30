import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'app/common/task/task';
import { TaskStatus } from 'app/common/task/taskStatus';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditHistoryComponent } from 'app/common/task/edit-task/edit-modal/edit-history/edit-history.component';
import { EditHistory } from 'app/common/task/edit-task/edit-modal/edit-history/editHistory';
import { EditType } from 'app/common/task/edit-task/edit-modal/edit-history/editType';
import { GenericButtonComponent } from 'app/common/generics/generic-button/generic-button-component';

@Component({
  selector: 'edit-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogClose,
    EditHistoryComponent,
    GenericButtonComponent
  ],
  templateUrl: './edit-modal.component.html'
})
export class EditModalComponent implements OnInit, OnDestroy {

  task: Task = new Task('', '', TaskStatus.TODO, []);
  form!: FormGroup;
  taskStatusOptions = Object.values(TaskStatus);

  constructor(
    private readonly dialogRef: MatDialogRef<EditModalComponent>,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      taskSummary: [this.task.summary, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      taskStatus: [this.task.status, Validators.required]
    });
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onCloseButton();
    } else if (event.key === 'Enter') {
      this.onSaveButton();
    }
  }

  onSaveButton() {
    this.dialogRef.close(this.form.value);
    const { taskSummary, taskStatus } = this.form.value;

    let newEditHistory = this.task.editHistory;

    if (this.task.summary !== taskSummary && this.task.status !== taskStatus) {
      newEditHistory = [...newEditHistory, new EditHistory(new Date(), EditType.STATUS_CHANGE_AND_RENAME, this.task.status, taskStatus)];
    } else if (this.task.status !== taskStatus) {
      newEditHistory = [...newEditHistory, new EditHistory(new Date(), EditType.STATUS_CHANGE, this.task.status, taskStatus)];
    } else if (this.task.summary !== taskSummary) {
      newEditHistory = [...newEditHistory, new EditHistory(new Date(), EditType.RENAME, this.task.summary, taskSummary)];
    }

    this.task = new Task(this.task.id, taskSummary, taskStatus, newEditHistory);
  }

  onCloseButton() {
    this.dialogRef.close();
  }
}
