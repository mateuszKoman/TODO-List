import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ThemeEffects } from 'app/common/theme-mode/theme-service/state/theme-effects';
import { reducer as themeReducer } from './app/common/theme-mode/theme-service/state/theme-reducer';
import { AppComponent } from 'app/app.component';
import { listIDsReducer } from 'app/common/generics/generic-list/list-ids-service/state/listID-reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      theme: themeReducer,
      listIDs: listIDsReducer
    }),
    provideEffects([ThemeEffects])
  ]
});
