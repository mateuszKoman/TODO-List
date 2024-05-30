import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskListComponent } from '../common/task-list/task-list-component';
import { ListHeaderComponent } from 'app/common/list-header/list-header.component';
import { ThemeModeSwitcherComponent } from '../common/theme-mode-switcher/theme-mode-switcher.component';
import { NgClass, NgForOf } from '@angular/common';
import { BacklogComponent } from 'app/main/backlog/backlog.component';
import { ToDoListComponent } from 'app/main/to-do-list/to-do-list.component';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AppHeaderComponent } from 'app/main/header/header-component/app-header.component';
import { GenericList } from 'app/common/generics/generic-list/generic-list.component';
import { EditModalComponent } from 'app/common/task/edit-task/edit-modal/edit-modal.component';
import { ListIDsServiceService } from 'app/common/generics/generic-list/list-ids-service/list-ids-service.service';

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [
    TaskListComponent,
    ListHeaderComponent,
    ThemeModeSwitcherComponent,
    NgClass,
    BacklogComponent,
    ToDoListComponent,
    CdkDropListGroup,
    AppHeaderComponent,
    EditModalComponent,
    CdkDrag,
    CdkDropList,
    NgForOf
  ],
  templateUrl: './main.component.html'
})
export class MainComponent {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private componentCounter: number = 0;

  constructor(
    private readonly listIDsServiceService: ListIDsServiceService
  ) {
  }

  createList() {
    this.componentCounter++;
    const listComponentRef = this.container.createComponent(GenericList);
    listComponentRef.location.nativeElement.id = `component-${this.componentCounter}`;
    listComponentRef.instance.id = `list-${this.componentCounter}`;
    listComponentRef.instance.listName = `LIST-${this.componentCounter}`;
    this.listIDsServiceService.addIDtoListID(listComponentRef.instance.listName);

    listComponentRef.location.nativeElement.draggable = true;
    listComponentRef.location.nativeElement.addEventListener('dragstart', this.onDragStart.bind(this));
    listComponentRef.location.nativeElement.addEventListener('dragenter', this.allowDrop.bind(this));
    listComponentRef.location.nativeElement.addEventListener('drop', this.onDrop.bind(this));
  }

  onDragStart(event: DragEvent) {
    const targetElement = event.currentTarget as HTMLElement;
    event.dataTransfer?.setData('text/plain', targetElement.id);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const draggedId = event.dataTransfer?.getData('text/plain');
    if (!draggedId) return;

    const draggedElement = document.getElementById(draggedId);
    const targetElement = event.currentTarget as HTMLElement;

    if (draggedElement && targetElement) {
      const parent = targetElement.parentNode;
      const placeholder = document.createElement('div');
      parent?.insertBefore(placeholder, targetElement);

      const nextSibling = targetElement.nextSibling;
      if (nextSibling) {
        parent?.insertBefore(targetElement, draggedElement);
      } else {
        parent?.appendChild(targetElement);
      }

      parent?.replaceChild(draggedElement, placeholder);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
