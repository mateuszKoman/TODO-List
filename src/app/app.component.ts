import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from 'app/main/main.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { firebase } from 'firebase/firebase';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainComponent],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: firebase.firebaseConfig }
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'todolist';
}
