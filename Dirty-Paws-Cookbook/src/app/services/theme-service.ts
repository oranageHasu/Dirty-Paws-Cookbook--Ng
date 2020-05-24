import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _darkTheme = false;

  IsDarkTheme(): boolean {

    return this._darkTheme;

  }

  SetDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme = isDarkTheme;
  }

}
