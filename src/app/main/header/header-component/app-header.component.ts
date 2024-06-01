import { Component, EventEmitter, Output } from '@angular/core';
import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode/theme-mode-switcher/theme-mode-switcher.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    NewListButtonComponent,
    ThemeModeSwitcherComponent
  ],
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  @Output()
  newListEventEmitter: EventEmitter<any> = new EventEmitter<any>;

  onNewListClick() {
    this.newListEventEmitter.emit();
  }
}
