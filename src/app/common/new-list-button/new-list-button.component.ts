import { Component, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { GenericButtonComponent } from 'app/common/generics/generic-button/generic-button-component';

@Component({
  selector: 'new-list',
  standalone: true,
  imports: [
    NgClass,
    GenericButtonComponent
  ],
  templateUrl: './new-list-button.component.html'
})
export class NewListButtonComponent {
  @Output()
  newListEventEmitter: EventEmitter<any> = new EventEmitter<any>

  onNewListClick() {
    this.newListEventEmitter.emit()
  }
}
