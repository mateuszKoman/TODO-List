import { Component, DestroyRef, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { EditHistory } from 'app/common/task/task-card/edit-task/edit-modal/edit-history/editHistory';

@Component({
  selector: 'edit-history',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './edit-history.component.html',
  styleUrl: './edit-history.component.css'
})
export class EditHistoryComponent {

  @Input()
  editHistory?: Array<EditHistory>
}
