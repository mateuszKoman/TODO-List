import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { EditHistory } from 'app/common/task/edit-task/edit-modal/edit-history/editHistory';

@Component({
  selector: 'edit-history',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './edit-history.component.html'
})
export class EditHistoryComponent {

  @Input()
  editHistory?: ReadonlyArray<EditHistory>
}
