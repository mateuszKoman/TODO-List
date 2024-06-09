import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ThemeEffects } from 'app/common/theme-mode/theme-service/state/theme-effects';
import { reducer as themeReducer } from './app/common/theme-mode/theme-service/state/theme-reducer';
import { AppComponent } from 'app/app.component';
import { listIDsReducer } from 'app/common/generics/generic-list/list-ids-service/state/listID-reducer';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { firebase } from 'firebase/firebase';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';


bootstrapApplication(AppComponent, {
  providers: [
  { provide: FIREBASE_OPTIONS, useValue: firebase.firebaseConfig },
    provideFirebaseApp(() => initializeApp(firebase.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStore({
      theme: themeReducer,
      listIDs: listIDsReducer
    }),
    provideEffects([ThemeEffects]), provideFirebaseApp(() => initializeApp({"projectId":"todolist-c39d9","appId":"1:246949119104:web:65767b78cb072d0990d265","storageBucket":"todolist-c39d9.appspot.com","apiKey":"AIzaSyCDLUXrzaxZxmiZH3Ux6iDnxAIyQS1-taY","authDomain":"todolist-c39d9.firebaseapp.com","messagingSenderId":"246949119104","measurementId":"G-S2FRHXVLG9"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging())
  ]
});
