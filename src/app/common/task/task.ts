import { TaskStatus } from 'app/common/task/taskStatus';
import { EditHistory } from 'app/common/task/task-card/edit-task/edit-modal/edit-history/editHistory';

export class Task {
  id: string;
  summary: string;
  status: TaskStatus;
  editHistory: ReadonlyArray<EditHistory>;

  constructor(id: string, summary: string, status: TaskStatus, editHistory: ReadonlyArray<EditHistory>) {
    this.id = id;
    this.summary = summary;
    this.status = status;
    this.editHistory = editHistory;
  }
}
