import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from 'app/common/task/task-card/edit-task/edit-modal/edit-modal.component';
import { Task } from 'app/common/task/task';

@Component({
  selector: 'edit-button',
  standalone: true,
  imports: [],
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css'
})
export class EditButtonComponent {
  @Input()
  task!: Task;

  constructor(private matDialog: MatDialog) {
  }


  onEditClick(event: MouseEvent) {
    console.log('dupa')
    const dialogRef = this.matDialog.open(EditModalComponent);
    dialogRef.componentInstance.task = this.task;
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal został zamknięty');
    });
  }
}
