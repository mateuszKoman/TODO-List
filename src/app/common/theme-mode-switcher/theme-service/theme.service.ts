import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // private readonly localStorageKey = 'isDarkMode';

  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  isDarkMode(): Observable<boolean> {
    return this.darkModeSubject.asObservable();
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode);
    this.updateHtmlRootAttribute(isDarkMode);
    //TODO Theme mode saved in local Storage
    // localStorage.setItem(this.localStorageKey, JSON.stringify(isDarkMode));
  }
  //
  // private getInitialDarkModeState(): boolean {
  //   const storedState = localStorage.getItem(this.localStorageKey);
  //   return storedState ? JSON.parse(storedState) : false;
  // }

  updateHtmlRootAttribute(isDarkMode: boolean): void {
    const htmlElement = this.renderer.selectRootElement('html', true);
    if (isDarkMode) {
      this.renderer.setAttribute(htmlElement, 'theme-mode', 'dark');
    } else {
      this.renderer.removeAttribute(htmlElement, 'theme-mode');
    }
  }
}
