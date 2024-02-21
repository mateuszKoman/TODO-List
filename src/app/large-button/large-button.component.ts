import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme-mode-switcher/theme-service/theme.service';

@Component({
  selector: 'large-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './large-button.component.html',
  styleUrls: ['./large-button.component.css']
})
export class LargeButtonComponent implements OnDestroy {
  isDarkMode: boolean = false;
  private themeSubscription: Subscription;

  @Output()
  buttonClickEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.isDarkMode().subscribe((darkMode) => {
      this.isDarkMode = darkMode;
    })
  }

  sendButtonClick(): void {
    this.buttonClickEmitter.emit();
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
