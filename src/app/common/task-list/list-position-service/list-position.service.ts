import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListPositionService {

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
