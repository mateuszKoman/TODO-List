import { TaskStatus } from 'app/common/task/taskStatus';
import { EditHistory } from 'app/common/task/edit-task/edit-modal/edit-history/editHistory';

export class Task {
  readonly id: string;
  readonly summary: string;
  readonly status: TaskStatus;
  readonly editHistory: ReadonlyArray<EditHistory>;

  constructor(id: string, summary: string, status: TaskStatus, editHistory: ReadonlyArray<EditHistory>) {
    this.id = id;
    this.summary = summary;
    this.status = status;
    this.editHistory = editHistory;
  }
}
