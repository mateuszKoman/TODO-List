import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly localStorageKey = 'isDarkMode';
  private darkModeSubject = new BehaviorSubject<boolean>(this.getInitialDarkModeState());

  isDarkMode(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode);
    localStorage.setItem(this.localStorageKey, JSON.stringify(isDarkMode));
  }

  private getInitialDarkModeState(): boolean {
    const storedState = localStorage.getItem(this.localStorageKey);
    return storedState ? JSON.parse(storedState) : false;
  }
}
