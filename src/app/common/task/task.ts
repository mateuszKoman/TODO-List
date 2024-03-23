import { TaskStatus } from 'app/common/task/taskStatus';

export class Task {
  id: string;
  summary: string;
  status: TaskStatus;

  constructor(id: string, summary: string, status: TaskStatus) {
    this.id = id;
    this.summary = summary;
    this.status = status;
  }

  static equals(first: Task, second: Task): boolean {
    return first.id === second.id && first.summary === second.summary;
  }
}
