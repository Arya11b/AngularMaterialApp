import {Component, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
import {lang} from "../../resources/lang";
import {LanguageService} from "../services/language.service";
import {FieldService} from "../services/field.service";
const SMALL_SCREEN_BREAKPOINT = 720;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dir = 'ltr';
  lang = 'en';
  isAlternateTheme = false;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT}px)`);
  constructor(zone: NgZone, private router: Router, private languageService: LanguageService) {
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  ngOnInit() {
    this.router.events.subscribe(() => {
      if(this.isScreenSmall())
        this.sidenav.close();
    });
  }
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
  isScreenLarge(): boolean {
    return !this.isScreenSmall();
  }
  getMode(): string {
    return this.isScreenSmall() ? 'over' : 'side';
  }
  toggleRtl() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.lang = this.lang == 'en' ? 'fa' : 'en';
    this.languageService.changeLang();
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }
  toggleTheme() {
    this.isAlternateTheme = ! this.isAlternateTheme;
  }
  getLang() {
    return lang[this.lang];
  }
}
