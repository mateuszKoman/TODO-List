import { Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import { NewListButtonComponent } from 'app/common/new-list-button/new-list-button.component';
import { ThemeModeSwitcherComponent } from 'app/common/theme-mode-switcher/theme-mode-switcher.component';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    NewListButtonComponent,
    ThemeModeSwitcherComponent
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent implements OnInit{
  isDarkMode: boolean = false;
  @Output()
  newListEventEmitter: EventEmitter<any> = new EventEmitter<any>;

  constructor(private readonly themeService: ThemeService,
              private readonly destroyRef: DestroyRef) {
  }

  ngOnInit(): void {
    this.observeThemeMode();
  }

  observeThemeMode(): void {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((isDarkModeON: boolean) => {
      this.isDarkMode = isDarkModeON;
    });
  }

  onNewListClick() {
    this.newListEventEmitter.emit()
  }
}
