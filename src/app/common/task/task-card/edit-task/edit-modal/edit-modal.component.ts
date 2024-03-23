import { Component, forwardRef, OnInit } from '@angular/core';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { Task } from 'app/common/task/task';
import { TaskStatus } from 'app/common/task/taskStatus';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { EditHistoryComponent } from 'app/common/task/task-card/edit-task/edit-modal/edit-history/edit-history.component';
import {
  ChangeHistoryStorageService
} from 'app/common/task/task-card/edit-task/edit-modal/edit-history/change-history-storage-service/change-history-storage.service';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'edit-modal',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    CommonModule,
    MatDialogClose,
    EditHistoryComponent
  ],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent implements OnInit {

  task: Task = new Task('', '', TaskStatus.TODO);
  form!: FormGroup;
  taskStatusOptions = Object.values(TaskStatus);
  isDarkMode = false;

  constructor(
    private readonly dialogRef: MatDialogRef<EditModalComponent>,
    private readonly fb: FormBuilder,
    private readonly changeHistoryStorageService: ChangeHistoryStorageService,
    private readonly themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      taskSummary: [this.task.summary, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      taskStatus: [this.task.status || TaskStatus.TODO, Validators.required]
    });
    this.observeThemeMode();
  }

  onSaveButton() {
    this.dialogRef.close(this.form.value);
    const { taskSummary } = this.form.value;
    const { taskStatus } = this.form.value;
    if (this.task.summary !== taskSummary || this.task.status !== taskStatus) {
      this.changeHistoryStorageService.setChangeHistory(new Date());
    }
    this.task.summary = taskSummary;
    this.task.status = taskStatus;
  }

  onCloseButton() {
    this.dialogRef.close();
  }

  observeThemeMode() {
    this.themeService.isDarkMode()
      .pipe(takeUntilDestroyed()
      ).subscribe(isDarkMode => {
        this.isDarkMode = isDarkMode;
    })
  }
}
