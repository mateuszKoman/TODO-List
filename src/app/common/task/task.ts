export class Task {
  id: string;
  summary: string;

  constructor(id: string, summary: string) {
    this.id = id;
    this.summary = summary;
  }

  static equals(first: Task, second: Task): boolean {
    return first.id === second.id && first.summary === second.summary;
  }
}
