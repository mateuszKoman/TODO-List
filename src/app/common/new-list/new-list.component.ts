import { Component, DestroyRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'new-list',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.css'
})
export class NewListComponent implements OnInit {
  @Output()
  newListEventEmitter: EventEmitter<any> = new EventEmitter<any>
  isDarkMode: boolean = false;

  constructor(private readonly themeService: ThemeService,
              private readonly destroyRef: DestroyRef) {
  }

  ngOnInit(): void {
    this.observeThemeMode();
  }

  onNewListClick() {
    this.newListEventEmitter.emit()
  }

  observeThemeMode(): void {
    this.themeService.isDarkMode().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((isDarkModeON: boolean) => {
      this.isDarkMode = isDarkModeON;
    });
  }
}
