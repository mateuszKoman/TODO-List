import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'app/common/task/task';
import { EditHistory } from 'app/common/task/edit-task/edit-modal/edit-history/editHistory';
import { EditType } from 'app/common/task/edit-task/edit-modal/edit-history/editType';

@Injectable({ providedIn: 'root' })
export class TaskPositionService {

  constructor() { }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      event.previousContainer.data.filter(task => task.id !== event.container.data[event.currentIndex].id)
      event.item.data.editHistory.push(new EditHistory(new Date(), EditType.REPLANNED, event.previousContainer.id, event.container.id ));
    }
  }
}
