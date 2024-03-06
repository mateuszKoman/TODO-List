import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ThemeService } from 'app/common/theme-mode-switcher/theme-service/theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

