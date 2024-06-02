import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ThemeEffects } from 'app/common/theme-mode/theme-service/theme-state/theme-effects';
import { reducer as themeReducer } from './app/common/theme-mode/theme-service/theme-state/theme-reducer';
import { AppComponent } from 'app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ theme: themeReducer }),
    provideEffects([ThemeEffects])
  ]
});
