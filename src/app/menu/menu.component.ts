import {Component, NgZone, OnInit} from '@angular/core';
const SMALL_SCREEN_BREAKPOINT = 720;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_SCREEN_BREAKPOINT}px)`);
  constructor(zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  }
  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
