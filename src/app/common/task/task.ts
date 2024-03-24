import { TaskStatus } from 'app/common/task/taskStatus';
import { EditHistory } from 'app/common/task/task-card/edit-task/edit-modal/edit-history/editHistory';

export class Task {
  id: string;
  summary: string;
  status: TaskStatus;
  editHistory: Array<EditHistory>;

  constructor(id: string, summary: string, status: TaskStatus, editHistory: Array<EditHistory>) {
    this.id = id;
    this.summary = summary;
    this.status = status;
    this.editHistory = editHistory;
  }

  static equals(first: Task, second: Task): boolean {
    return first.id === second.id && first.summary === second.summary;
  }
}
