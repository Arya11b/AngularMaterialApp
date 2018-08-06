import {Component, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material";
const SMALL_SCREEN_BREAKPOINT = 720;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dir = 'ltr';
  isAlternateTheme = false;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT}px)`);
  constructor(zone: NgZone, private router: Router) {
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
  }
  toggleTheme() {
    this.isAlternateTheme = ! this.isAlternateTheme;
  }
}
