import { ChangeDetectorRef, Component } from '@angular/core';
import { LargeButtonComponent } from './../large-button/large-button.component';
import { ListsActionHandlerService } from './../middle/lists-action-handler/lists-action-handler.service';

@Component({
  selector: 'middle-component',
  standalone: true,
  imports: [
    LargeButtonComponent
  ],
  templateUrl: './middle.component.html',
  styleUrl: './middle.component.css'
})
export class MiddleComponent {
  taskToAdd?: string[];

  constructor(private listsActionHandler: ListsActionHandlerService,
              private readonly changeDetectorRef: ChangeDetectorRef
) {
  }

  addToToDoList() {
    this.listsActionHandler.addToToDoList();
    this.changeDetectorRef.detectChanges();
  }

  revertToBacklog() {
    this.listsActionHandler.revertToBacklog();
    this.changeDetectorRef.detectChanges();
  }
}
