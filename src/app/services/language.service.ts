import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private lang = 'en';
  constructor() { }
  public getLang() {
    return this.lang;
  }
  public changeLang() {
    this.lang = this.lang == 'en' ? 'fa' : 'en';
  }
}
