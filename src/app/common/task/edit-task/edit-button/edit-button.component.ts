import { Component, Input, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditModalComponent } from 'app/common/task/edit-task/edit-modal/edit-modal.component';
import { Task } from 'app/common/task/task';

@Component({
  selector: 'edit-button',
  standalone: true,
  imports: [],
  templateUrl: './edit-button.component.html'
})
export class EditButtonComponent {
  @Input()
  task!: Task;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly renderer: Renderer2
  ) {
  }

  onEditClick(event: MouseEvent) {
    const dialogRef = this.matDialog.open(EditModalComponent);
    dialogRef.addPanelClass(['mk-h-[800px]', 'mk-w-[1000px]', 'mk-rounded-3xl']);
    dialogRef.componentInstance.task = this.task;
    dialogRef.disableClose = true;

    this.changeDialogStyles(dialogRef);
  }

  changeDialogStyles(dialogRef: MatDialogRef<EditModalComponent>): void {
    const firstModalParent = document.querySelector('.mat-mdc-dialog-surface');

    dialogRef.afterOpened().subscribe(() => {
      this.renderer.addClass(firstModalParent, '!mk-rounded-3xl');
    });
  }
}
